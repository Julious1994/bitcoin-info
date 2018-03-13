import React, { Component, PropTypes } from 'react';
import {
    Editor,
    createEditorState,
    ImageSideButton,
    Block,
    addNewBlock,
} from 'medium-draft';
import mediumDraftExporter from 'medium-draft/lib/exporter';

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
        newsList: [],    
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
    const { data } = this.props;
    const newsList = data ? data.newsList : [];
    this.setState({ newsList });
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

  removePost(post) {
    let url = `${this.props.baseUrl}/rest/news`;
    const data = {};
    if (post.id) {
        const ids=[post.id];
        fetch(url, {
            method: 'DELETE',
            headers,
            body: JSON.stringify({
                "ids": ids,
            })
        }).then(res => {
            res.json().then(result => {
                console.log(result, ids, ids.length);
                if (result.affectedRows === ids.length) {
                    const { newsList } = this.state;
                    ids.forEach(id => {
                        const target = newsList.findIndex(news => news.id === id);
                        newsList.splice(target, 1);
                    });
                    this.setState({ newsList });
                }
            })
        });
    }
  }

  render() {
    const { news_url, data } = this.props;
    const { artical = {} } = this.state;
    const { newsList } = this.state;
    return (
      <div style={{ marginLeft: '20%', }}>
        <div>
            <a href={this.props.baseUrl + '/admin/post/create-post'}>
                New Post
            </a>
        </div>
            <table className="table table-hover">
                <tbody>
                    {
                        newsList.map((news, i) => (
                            <tr>
                                <td style={{ width: 20}}>
                                    <span className="remove-post" onClick={() => this.removePost(news)}>Delete</span>
                                </td>
                                <td>
                                    <b>
                                        <a 
                                            href={this.props.baseUrl + '/admin/post/' + news.slug_url }
                                        >
                                            {news.title}
                                        </a>
                                    </b>
                                </td>
                                <td>
                                    <span className="remove-post">Publish</span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* <ul className="post-list-ul">
                {
                    newsList.map((news, i) => (
                        <li>
                            <div className="post-item-container">
                                <div className="title-container">
                                    <b>
                                        <a 
                                            href={this.props.baseUrl + '/admin/post/' + news.slug_url }
                                        >
                                            {news.title}
                                        </a>
                                    </b>    
                                </div>
                                <div className="options"></div>
                            </div>
                        </li>
                    ))
                }
            </ul> */}
      </div>
    );
  }
}
