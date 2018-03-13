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
import { convertToRaw } from 'draft-js';
import mediumDraftImporter from 'medium-draft/lib/importer';

const ExtraButtons = [{
  label: 'H1',
  style: 'header-one',
  icon: 'header',
  key:'h1',
  description: 'Heading 1'
},{
  label: 'H2',
  key: 'h2',
  style: 'header-two',
  icon: 'header',
  description: 'Heading 2'
}];

// BLOCK_BUTTONS.splice(0, 0, ...ExtraButtons);
/* Add seprator */
class SeparatorSideButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let editorState = this.props.getEditorState();
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('separator', 'IMMUTABLE', {});
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    editorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
    this.props.setEditorState(
      AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        '-'
      )
    );
    this.props.close();
  }
}

/* Embed view */
class AtomicEmbedComponent extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        showIframe: false,
      };
  
      this.enablePreview = this.enablePreview.bind(this);
    }
  
    componentDidMount() {
      this.renderEmbedly();
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevState.showIframe !== this.state.showIframe && this.state.showIframe === true) {
        this.renderEmbedly();
      }
    }
  
    getScript() {
      const script = document.createElement('script');
      script.async = 1;
      script.src = '//cdn.embedly.com/widgets/platform.js';
      script.onload = () => {
        window.embedly();
      };
      document.body.appendChild(script);
    }
  
    renderEmbedly() {
      if (window.embedly) {
        window.embedly();
      } else {
        this.getScript();
      }
    }
  
    enablePreview() {
      this.setState({
        showIframe: true,
      });
    }
  
    render() {
      const { url } = this.props.data;
      const innerHTML = `<div><a class="embedly-card" href="${url}" data-card-controls="0" data-card-theme="dark">Embedded ― ${url}</a></div>`;
      return (
        <div className="md-block-atomic-embed">
          <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
        </div>
      );
    }
  }
  
  const AtomicSeparatorComponent = (props) => (
    <hr />
  );
  
  const AtomicBlock = (props) => {
    const { blockProps, block } = props;
    const content = blockProps.getEditorState().getCurrentContent();
    const entity = content.getEntity(block.getEntityAt(0));
    const data = entity.getData();
    const type = entity.getType();
    if (blockProps.components[type]) {
      const AtComponent = blockProps.components[type];
      return (
        <div className={`md-block-atomic-wrapper md-block-atomic-wrapper-${type}`}>
          <AtComponent data={data} />
        </div>
      );
    }
    return <p>Block of type <b>{type}</b> is not supported.</p>;
  };


/* Add Link*/ 
class EmbedSideButton extends React.Component {
    constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
      this.addEmbedURL = this.addEmbedURL.bind(this);
    }
  
    onClick() {
      const url = window.prompt('Enter a URL', '');
      this.props.close();
      if (!url) {
        return;
      }
      this.addEmbedURL(url);
    }
  
    addEmbedURL(url) {
      let editorState = this.props.getEditorState();
      const content = editorState.getCurrentContent();
      const contentWithEntity = content.createEntity('embed', 'IMMUTABLE', {url});
      const entityKey = contentWithEntity.getLastCreatedEntityKey();
      editorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
      this.props.setEditorState(
        AtomicBlockUtils.insertAtomicBlock(
          editorState,
          entityKey,
          'E'
        )
      );
    }
  
    render() {
      return (
        <button
          className="md-sb-button md-sb-img-button"
          type="button"
          title="Add an Embed"
          onClick={this.onClick}
        >
          <i className="fa fa-code" />
        </button>
      );
    }
  
  }

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

export default class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artical: {
          content: createEditorState(),
          title: '',
          slug_url: '',
          seo_title: '',
          seo_description: '',
          seo_tags: '',
      },
      isNew: true,
    };
    this.sideButtons = [{
      title: 'Image',
      component: CustomImageSideButton,
    }, {
      title: 'Embed',
      component: EmbedSideButton,
    }, {
      title: 'Separator',
      component: SeparatorSideButton,
    }];
  }

  componentDidMount() {
    const { data } = this.props;
    if (typeof data.artical === 'object') {
      const artical = data.artical[0];
      artical.content = createEditorState(convertToRaw(mediumDraftImporter(artical.content)));
      this.setState({ artical, isNew: data.isNew });
    }
    // createEditorState(convertToRaw(mediumDraftImporter(html)));
  }

  onChange(content) {
    this.setState({ content });
  };

  changeFieldValue(field, value) {
    const { artical } = this.state;
    artical[field] = value;
    this.setState({ artical });
  }
  getUrlSlug(title) {
    const slug_url = title.toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'')
    ;
    return slug_url;
  }

  saveArtical() {
    const artical = Object.assign({}, this.state.artical);
    artical.content = mediumDraftExporter(artical.content.getCurrentContent())
    let url = `${this.props.baseUrl}/rest/news`;
    if (artical.id) {
      console.log(artical);
      url = `${url}/${artical.id}`;
      fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          "data": artical,
        })
      }).then(res => {
        res.json().then(result => {
          if (result.affectedRows > 0) {
            alert('Post updated');
          }
        })
      })
    } else {
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
  }

  render() {
    const { params, baseUrl } = this.props;
    const { artical, isNew } = this.state;
    return (
      <div style={{ display: 'flex'}}>
        <div style={{ marginLeft: '21%', width: '52%', marginTop: 10}}>
            <div>
              {
                isNew ?
                  <h2>Create New Post</h2>
                  :
                  <h2>Edit Post</h2>
              }
            </div>
            <div>
                <input 
                  className="form-control"
                  type="text" 
                  name="articalTitle" 
                  placeholder="Title"
                  value={artical.title}
                  onChange={(e) => {
                    this.changeFieldValue('title', e.target.value)
                    const slug_url = this.getUrlSlug(e.target.value);
                    this.changeFieldValue('slug_url',slug_url);
                  }}
                />
            </div>
            
            <div className="card mb-3" style={{ marginTop: 10, marginBottom: 10}}>
              <div className="card-header">Post Content</div>
              <div className="card-body" style={{ maxHeight: 400, overflow: 'auto'}}>
                <Editor
                    ref="editor"
                    editorState={artical.content}
                    sideButtons={this.sideButtons}
                    onChange={(e) => this.changeFieldValue('content', e)} 
                />
              </div>
            </div>
            <div>
                <button className="btn btn-primary btn-block" onClick={() => this.saveArtical()}>Save</button>
            </div>
          </div>
          <div style={{ marginLeft: 20}}>
            <div className="card mb-3">
                <div className="card-header">
                  SEO Details
                </div>
                <div className="card-body">  
                  <div className="input-container">
                      <input 
                        className="form-control"
                        type="text" 
                        name="seoTitle" 
                        placeholder="Title"
                        value={artical.seo_title}
                        onChange={(e) => this.changeFieldValue('seo_title', e.target.value)}
                      />
                  </div>
                  <div className="input-container">
                      <input 
                        className="form-control"
                        type="text" 
                        name="slugUrl" 
                        placeholder="Slug"
                        value={artical.slug_url}
                        onChange={(e) => this.changeFieldValue('slug_url', e.target.value)}
                      />
                  </div>
                  <div className="input-container">
                      <textarea 
                        className="form-control"
                        cols="25" 
                        rows="5" 
                        placeholder="Description"
                        onChange={(e) => this.changeFieldValue('seo_description', e.target.value)}
                        value={artical.seo_description}
                      >
                      </textarea>
                  </div>
                  <div className="input-container">
                      <textarea 
                        className="form-control"
                        cols="25" 
                        rows="5" 
                        placeholder="Tags"
                        onChange={(e) => this.changeFieldValue('seo_tags', e.target.value)}
                        value={artical.seo_tags}
                      >
                      </textarea>
                  </div>
                </div>
              </div>
          </div>
      </div>
    );
  }
}
