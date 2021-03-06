var React = require('react');
var ApiUtil = require('../../util/api_util.js');
var SessionStore = require('../../stores/session.js');
var TrackIndex = require('./index.jsx');

var Link = require('react-router').Link;

var TrackForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  backToIndex: function () {
    this.context.router.push('/');
  },

  getInitialState: function () {
    return {
      title: '',
      imageFile: null,
      imageUrl: null,
      audio: null
  	};
  },

  handleImageFileChange: function(e) {
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      var result = reader.result;
      this.setState({ imageFile: file, imageUrl: result });
    }.bind(this);

    reader.readAsDataURL(file);
  },

  handleAudioFileChange: function(e) {
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      this.setState({ audio: file});
    }.bind(this);

    reader.readAsDataURL(file);
  },

  componentDidMount: function() {
    if (!this.props.editOrCreate) {
      this.props.editOrCreate = 'create';
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var formData = new FormData();
    formData.append('track[title]', this.state.title);
    formData.append('track[description]', this.state.description);
    formData.append('track[image]', this.state.imageFile);
    formData.append('track[audio]', this.state.audio);

    var router = this.context.router;
    ApiUtil.createTrack(formData, function() {
      router.push('/#');
    });
  },

  updateTitle: function(e) {
    this.setState({ title: e.currentTarget.value });
  },

  updateDescription: function(e) {
    this.setState({ description: e.currentTarget.value });
  },

  updateTags: function(e) {
    this.setState({ tag: e.currentTarget.value });
  },

  render: function () {
    return(
        <div className='modal-wrapper'>
        <div className='modal-dimmer' onClick={this.backToIndex}/>
        <main className='track-form-main group'>
          <h2 className='track-form-header'>Upload Audio to Cloudcast</h2>
          <label>
            <input
              className="track-submit-button"
              onChange={this.handleAudioFileChange}
              type="file"
            ></input>
          </label>

          <form
            className='track-info-main'
            onSubmit={this.handleSubmit}
          >
            <img className='image-upload' src={this.state.imageUrl} />
            <label>
              <input
                className="image-upload-button"
                onChange={this.handleImageFileChange}
                type="file"
              ></input>
            </label>

            <div className='track-form-info-box'>
              <label>
                Title * <br />
                <input
                  className="track-title-input"
                  onChange={this.updateTitle}
                  type="text"
                  placeholder='Name your track'
                  defaultValue={this.state.title}
                />
              </label> <br />
              <label>
                Description <br />
                <textarea
                  className="track-description-input"
                  onChange={this.updateDescription}
                  type="text"
                  placeholder='Describe your podcast'
                  defaultValue={this.state.description}
                />
              </label>
            <br />
            </div>

            <div className='track-form-footer'>
              <span className='footer-text'> * Required field </span>
              <span className='track-form-buttons'>
                <Link to={'/'} className='track-cancel-button'>Cancel</Link>
                <input className="track-save-button" type="submit" value="Save" />
              </span>
            </div>
          </form>
        </main>
      </div>
    );
  }

});

module.exports = TrackForm;
