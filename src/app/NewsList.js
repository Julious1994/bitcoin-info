import React, { Component, PropTypes } from 'react';
import {
    Editor,
    createEditorState,
    ImageSideButton,
    Block,
    addNewBlock,
    getCurrentBlock,
    BLOCK_BUTTONS
} from 'medium-draft';
import mediumDraftExporter from 'medium-draft/lib/exporter';

const ExtraButtons = [{
    label: 'H1',
    style: 'header-one',
    icon: 'header',
    description: 'Heading 1'
  },{
    label: 'H2',
    style: 'header-two',
    icon: 'header',
    description: 'Heading 2'
}];

BLOCK_BUTTONS.splice(0, 0, ...ExtraButtons);

class CustomImageSideButton extends ImageSideButton {
    
    onChange(e) {
        const file = e.target.files[0];
        if (file.type.indexOf('image/') === 0) {
            // This is a post request to server endpoint with image as `image`
            const formData = new FormData();
            formData.append('image', file);
            formData.append('name', 'test');
            fetch('/upload', {
            method: 'POST',
            body: formData,
            }).then((response) => {
                console.log(response);
            if (response.status === 200) {
                // Assuming server responds with
                // `{ "url": "http://example-cdn.com/image.jpg"}`
                return response.json().then(data => {
                if (data.url) {
                    this.props.setEditorState(addNewBlock(
                    this.props.getEditorState(),
                    Block.IMAGE, {
                        src: '/uploads/' + data.url,
                    }
                    ));
                }
                });
            }
            });
        }
        this.props.close();
    }
    
}

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };

export default class News extends Component {

  constructor(props) {
      super(props);
      this.state = {
        artical: {
            editorState: createEditorState(),
            title: null,
            slug_url: null,
            seo_title: '',
            seo_description: '',
        },
      };
      this.sideButtons = [{
        title: 'Image',
        component: CustomImageSideButton,
      }];
  }

  onChange(editorState) {
    this.setState({ editorState });
  };

  changeFieldValue(field, value) {
    const { artical } = this.state;
    artical[field] = value;
    this.setState({ artical });
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  getUrlSlug(title) {
    const slugUrl = title.toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'')
    ;
    return slugUrl;
  }

  saveArtical() {
    const artical = Object.assign({}, this.state.artical);
    artical.slugUrl = this.getUrlSlug(artical.title || '');
    artical.content = mediumDraftExporter(artical.editorState.getCurrentContent())
    artical.slug_url = artical.slugUrl;
    delete artical.editorState;
    delete artical.slugUrl;
    const url = `${this.props.baseUrl}/rest/news`;
    console.log(artical);
    fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            "data": artical,
        })
    }).then(res => {
        res.json().then(result => {
            if (result.affectedRows > 0) {
                alert("Post Inserted");
            }
        })
    })
  }

  render() {
    const { news_url, data } = this.props;
    const { artical = {} } = this.state;
    const newsList = data ? data.newsList : [];
    console.log(newsList);
    return (
        <div style={{ marginLeft: 25}}>
        {
            newsList.map((news, i) => (

                <div className="news-list-item" style={{ display: 'flex', }}>
                    <div className="image-container">
                        <img src="./uploads/download.jpeg" style={{ width: 150, height: 150}} />
                    </div>
                    <div className="content-container">
                        <h3 style={{ fontSize: '14pt'}}>
                            <a className="content-link"
                                href={this.props.baseUrl + '/news/' + news.slug_url }
                            >
                                {news.title}
                            </a>
                        </h3>
                        <p className="time-author">
                            Admin | 10-Jan-2018
                        </p>
                        <p>{news.seo_description}</p>
                    </div>
                </div>
            ))
        }
        </div>
    );
  }
}
