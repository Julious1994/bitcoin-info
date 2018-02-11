import React, { Component, PropTypes } from 'react';
import {
    Editor,
    createEditorState,
    ImageSideButton,
    Block,
    addNewBlock,
} from 'medium-draft';

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
                        src: data.url,
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

export default class News extends Component {

  constructor(props) {
      super(props);
      this.state = {
        editorState: createEditorState(),
      };
      this.sideButtons = [{
        title: 'Image',
        component: CustomImageSideButton,
      }];
  }

  onChange(editorState) {
    this.setState({ editorState });
  };

  componentDidMount() {
    this.refs.editor.focus();
  }

  render() {
    const { news_url } = this.props;
    const { editorState } = this.state;
    
    return (
      <div>
            <ul>
                <li><a href={`http://${this.props.baseUrl}/news/news-lines-1`}>News Lines #1</a></li>
                <li><a href={`http://${this.props.baseUrl}/news/news-lines-2`}>News Lines #2</a></li>
                <li><a href={`http://${this.props.baseUrl}/news/news-lines-3`}>News Lines #3</a></li>
                <li><a href={`http://${this.props.baseUrl}/news/news-lines-4`}>News Lines #4</a></li>
            </ul>
            <div>
                <span>Editor</span>
                <Editor
                    ref="editor"
                    editorState={editorState}
                    sideButtons={this.sideButtons}
                    onChange={(e) => this.onChange(e)} 
                />
            </div>
      </div>
    );
  }
}
