var React = require('react');

var SeriesStore = require('../../stores/series.js');
var ApiUtil = require('../../util/api_util.js');

var CompactTrackIndexItem = require('./compact_track_index_item.jsx');

var SeriesIndexItem = React.createClass({

  getInitialState: function () {
    return { series: null };
  },

  componentDidMount: function () {
    this.seriesListener = SeriesStore.addListener(this._onChange);
    ApiUtil.fetchSingleSeries(this.props.seriesId);
  },

  componentWillUnmount: function () {
    this.seriesListener.remove();
  },

  _onChange: function () {
    this.setState({ series: SeriesStore.getSeries(this.props.seriesId) });
  },

  _expandTracks: function () {
    this.trackSample = this.state.series.tracks;
    this._onChange();
  },

  _collapseTracks: function () {
    this.trackSample = this.state.series.tracks.slice(0,3);
    this._onChange();
  },

  render: function () {

    if (!this.state.series) {
      return (<span></span>);
    } else {
      var series = this.state.series;
      var expandBar;
      if (series.tracks.length <= 3) {
        expandBar = (<span></span>);
      } else if (!this.trackSample || this.trackSample.length <= 3){
        expandBar = (
          <div
            className='track-demo expand-bar'
            onClick={this._expandTracks}>
            See all {series.tracks.length} tracks
          </div>
        );
      } else {
        expandBar = (
          <div
            className='track-demo expand-bar'
            onClick={this._collapseTracks}>
            See fewer tracks
          </div>
        );
      }
      var plu = 's';
      if (Object.keys(series.tracks).length === 1) {
        plu = '';
      }
      if (!this.trackSample) {
        this.trackSample = series.tracks.slice(0,3);
      }
      if (!this.representedTrack) {
        this.representedTrack = Math.floor(Object.keys(series.tracks).length*(Math.random()));
      }
      return(
        <main className='series-index-main group'>
          <section className='series-item-left'>
            <div className='series-item-image-box'>
            <img
              className='series-item-image'
              src={series.tracks[this.representedTrack].image}
            ></img>
              <div className='track-number'>{Object.keys(series.tracks).length} track{plu}</div>
            </div>
          </section>
          <section className='series-item-right'>
            <div className='series-demo-main group'>
              <div className='series-subheader'>
                <div className='playicon demo-play'></div>
                <span className='series-username'>{series.user.username}</span>
                <span className='series-title'>{series.title}</span>
              </div>
            </div>
            <div className='series-waveform'>
            </div>
            <section className='track-demo-list'>
            {this.trackSample.map(function (track, index) {
              return (
                <CompactTrackIndexItem key={track.id} trackId={track.id} index={index}/>
              );
            })}
            {expandBar}
            </section>
          </section>
        </main>
    );}
  }
});

module.exports = SeriesIndexItem;
