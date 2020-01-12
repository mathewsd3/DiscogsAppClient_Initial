import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/*
var Tracks_Array = [
    {id:0,username:'kllk',password:'hkhkh'},
    {id:1,username:'lapointe',password:'etetetetw'},
    {id:2,username:'mklm',password:'gg66gg6'},
    {id:3,username:'sdsd',password:'j8j8j8j'},
    {id:4,username:'kiki',password:'u8u8u'}
]
*/

// using axios see https://github.com/axios/axios

const axios = require('axios');

var Tracks_Array=[]

// user weather api


// Make a request for a user with a given ID
axios.get('http://localhost:3001/track')
  .then(function (response) {
    // handle success
    console.log(response);
    Tracks_Array =response.data;
    console.log(Tracks_Array)
    ReactDOM.render(<Tracks />, document.getElementById('root'));
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    console.log("Request was sent, some response received!")
  });



class Tracks extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            index:0,
            Track_count:Tracks_Array.length, // number of users in the array
            id: Tracks_Array[0].id,
            playlist_id: Tracks_Array[0].playlist_id,
            title: Tracks_Array[0].title,
            uri: Tracks_Array[0].uri,
            master_id: Tracks_Array[0].master_id
          };
    }


    //prevTrack
    prevTrack = () => {
            console.log(this.state.user_count)
            console.log(this.state.index)
            if(this.state.index>1)
            {
                this.setState({index:this.state.index-1})
                this.setState({id:  Tracks_Array[this.state.index].id});
                this.setState({playlist_id: Tracks_Array[this.state.index].playlist_id});
                this.setState({title: Tracks_Array[this.state.index].title});
                this.setState({uri: Tracks_Array[this.state.index].uri});
            }
      }
    //nextTrack
    nextTrack = () => {
            console.log(this.state.user_count)
            console.log(this.state.index)
            if(this.state.index < this.state.user_count-1)
            {
                this.setState({index:this.state.index-1})
                this.setState({id:  Tracks_Array[this.state.index].id});
                this.setState({playlist_id: Tracks_Array[this.state.index].playlist_id});
                this.setState({title: Tracks_Array[this.state.index].title});
                this.setState({uri: Tracks_Array[this.state.index].uri});
            }
      }


    render(){

        return(
            <div>
                id {this.state.id}<br/>
                playlist_id {this.state.playlist_id}<br/>
                title {this.state.title}<br/>
                uri {this.state.uri}<br/>
                master_id {this.state.master_id}<br/>

                <button type="button" onClick={this.prevTrack} >Previous Track</button>
                <button type="button" onClick={this.nextTrack} >Next Track</button>
            </div>
        )
    }
}


const OPTIONS = [{
    label: "Afghanistan",
    value: "1"
    }, {
    label: "South Africa",
    value: "2"
    }, {
    label: "Albania",
    value: "3"
    }, {
    label: "Algeria",
    value: "4"
    }]



class SelectList extends React.Component {
    constructor(props){
        super(props)
    }

    // build the list of options
    render(){

        console.log(this.props)
        console.log(this.props.options)

        //build option list

        const option_list=[]

        for(const [index, one_item] of this.props.options.entries()){
            option_list.push(<option value={one_item.value}>{one_item.label}</option>)
        }

        return(
            <div>
                <label>{this.props.text}</label>
                <select name={this.props.name} id={this.props.id}>
                    {option_list}
                </select>
            </div>
        )
    }
}


ReactDOM.render(<SelectList name="country" text="Select a country" id = "country_div" options={OPTIONS} />, document.getElementById('root1'));



class TrackList extends React.Component {
    constructor(props){
        super(props)
    }

    // build the list of options
    render(){

        console.log(this.props)
        console.log(this.props.options)

        //build option list
        console.log('--------------------------------------------------');
        const track_list=[]

        track_list.push(<tr><th>ID</th><th>Playlist_id</th><th>Title</th><th>URI</th><th>Master_id</th></tr>)
        for(const [index, one_item] of this.props.options.entries()){
            console.log(index)
            console.log(one_item)
            track_list.push(<tr><td>{one_item.id}</td><td>{one_item.playlist_id}</td><td>{one_item.title}</td><td>{one_item.uri}</td><td>{one_item.master_id}</td></tr>)
        }
        console.log(track_list);
        return(
            <div>
                <label>{this.props.text}</label>
                <table name={this.props.name} id={this.props.id}>
                    {track_list}
                </table>
            </div>
        )
    }
}

var newtrackarray = [];

axios.get('http://localhost:3001/track')
  .then(function (response) {
    // handle success
    console.log(response);
    newtrackarray =response.data;
    console.log(newtrackarray)
    ReactDOM.render(<TrackList name="tracks" text="List of tracks" id = "tracks_div" options={newtrackarray} />, document.getElementById('root2'));
})
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    console.log("Request was sent, some response received!")
  });

//ReactDOM.render(<TrackList name="tracks" text="List of tracks" id = "tracks_div" options={Tracks_Array} />, document.getElementById('root2'));


//ReactDOM.render(<RadioList name="province_selected" text="Select a Province" id = "province_radio_list" options={PROVINCES1} />, document.getElementById('province_radio'));

//-----------------------------------------------------------------------------------------------------------

let searchstring="queen"
let tokenstring="yUnnVXRpRpCAvYADxUYaAjKDVjWoPjhuZKyPWHJh"
let uri="https://api.discogs.com/database/search?q="+searchstring+"&token="+tokenstring

/*
class DiscogsTrackList extends React.Component {
    constructor(props){
        super(props)
    }

    // build the list of options
    render(){

        console.log(this.props)
        console.log(this.props.options)

        //build option list
        console.log('--------------------------------------------------');
        const discogs_track_list=[]

        discogs_track_list.push(<tr><th>ID</th><th>Playlist_id</th><th>Title</th><th>URI</th><th>Master_id</th></tr>)
        for(const [index, one_item] of this.props.options.entries()){
            console.log(index)
            console.log(one_item)
            track_list.push(<tr><td>{one_item.id}</td><td>{one_item.playlist_id}</td><td>{one_item.title}</td><td>{one_item.uri}</td><td>{one_item.master_id}</td></tr>)
        }
        console.log(track_list);
        return(
            <div>
                <label>{this.props.text}</label>
                <table name={this.props.name} id={this.props.id}>
                    {track_list}
                </table>
            </div>
        )
    }
}
*/
var discogstrackarray = [];

axios.get(uri)
  .then(function (response) {
    // handle success
    console.log(response);
    console.log('-************->---------->----------')
    discogstrackarray =response.data.results;
    console.log(discogstrackarray)
    //ReactDOM.render(<TrackList name="tracks" text="List of tracks" id = "tracks_div" options={newtrackarray} />, document.getElementById('root2'));
})
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    console.log("Request was sent, some response received!")
  });


  //---------------------------------------
  var Discogs = require('disconnect').Client;

  var db = new Discogs({userToken:'yUnnVXRpRpCAvYADxUYaAjKDVjWoPjhuZKyPWHJh'}).database();

  db.getRelease(176126, function(err, data){
    console.log('-------------------------------------------------------')
    console.log('-------------------------------------------------------')
    console.log(data);
  });



  //--------------------------
  //search by artist

  /*
  let searchbyartiststring="nirvana"
  let tokenstring1="yUnnVXRpRpCAvYADxUYaAjKDVjWoPjhuZKyPWHJh"
  let artisturi="https://api.discogs.com/database/search?q="+searchbyartiststring+"&token="+tokenstring1
  */
  axios.get('https://api.discogs.com/database/search?release_title=nevermind&artist=nirvana&per_page=3&page=1&token=yUnnVXRpRpCAvYADxUYaAjKDVjWoPjhuZKyPWHJh')
  .then(function (response) {
    // handle success
    console.log('--<--->->->------------------------------')
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA



//------------------------------new mod

serviceWorker.unregister();
