/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

const CODES = {
    error: {
        1: 'MEDIA_ERR_ABORTED',
        2: 'MEDIA_ERR_NETWORK',
        3: 'MEDIA_ERR_DECODE',
        4: 'MEDIA_ERR_NONE_SUPPORTED'

    },

    status: {
        0: 'MEDIA_NONE',
        1: 'MEDIA_STARTING',
        2: 'MEDIA_RUNNING',
        3: 'MEDIA_PAUSED',
        4: 'MEDIA_STOPPED'
    }
}

const APP = {
    media: null, 
    tracks: [
        {
            id: 412,
            artist: 'Bob McFerrin',
            track: 'Dont Worry Be Happy',
            length: 0,
            image: './img/jasonLeung-unsplash.jpg',
            src: './media/dont-worry-be-happy.mp3',
            volume: 0.5
        },
        {
            id: 222,
            artist: 'Goo Goo Dolls',
            track: 'Come to Me',
            length: 0,
            image: './img/gooGooDolls.jpg',
            src: './media/come-to-me.mp3',
            volume: 0.5
        },
        {
            id: 141,
            artist: 'Imagine Dragons',
            track: 'Walking the Wire',
            length: 0,
            image: './img/imagineDragons.jpg',
            src: './media/walking-the-wire.mp3',
            volume: 0.5
        },
        {
            id: 312,
            artist: 'John Denver',
            track: 'Take me Home, Country Roads',
            length: 0,
            image: './img/johnDenver.jpg',
            src: './media/take-me-home.mp3',
            volume: 0.5
        },
        {
            id: 566,
            artist: 'X Ambassadors',
            track: 'Gorgeous',
            length: 0,
            image: './img/xAmbassadors.jpg',
            src: './media/gorgeous.mp3',
            volume: 0.5
        },
    ],
    init: () => {
        APP.addListeners()
        APP.showPlaylist()
        APP.mountMedia()
    },
    addListeners: () => {
        document.getElementById('btnClose').addEventListener('click', APP.displayHome)
        document.getElementById('play').addEventListener('click', APP.play)
        document.getElementById('pause').addEventListener('click', APP.pause)
        document.getElementById('ff').addEventListener('click', APP.fastForward)
        document.getElementById('rw').addEventListener('click', APP.rewind)
        document.getElementById('mute').addEventListener('click', APP.toggleMute)
    },
    showPlaylist: () => {
        console.log("suhhh dude");
        let list = document.getElementById('playlist')
        list.innerHTML = '';
        let df = document.createDocumentFragment()
        APP.tracks.forEach((song => {
            let li = document.createElement('li')
            let div = document.createElement('div')
            let img = document.createElement('img')
            let title = document.createElement('h4')
            let artist = document.createElement('h6') 

            img.alt = 'track photo'
            img.src = song.image
            title.textContent = song.track;
            artist.textContent = song.artist

            li.setAttribute('data-key', song.id)
            
            li.append(img)
            div.append(title)
            div.append(artist)
            li.append(div)

            df.append(li);

            li.addEventListener("click", APP.displaySongPage)
        })
        )
        list.append(df)
    },

    displayHome: () => {
        document.querySelector('.page.active').classList.remove('active')
        document.getElementById('home').classList.add('active')
    },
    displaySongPage: (ev) => {
        console.log('hi')
        document.querySelector('.page.active').classList.remove('active')
        document.getElementById('track').classList.add('active')

        APP.songCard(ev)
    },

    songCard: (ev) => {
        let clickedThing = ev.target;
        let track = clickedThing.closest('[data-key]');
        console.log(track);
        
        if(track) {
            const id = parseInt(track.getAttribute('data-key'));
            APP.tracks.find(song => {
                if (song.id === id) {
                document.getElementById('track-image').src = song.image; 
                document.getElementById('track-title').textContent = song.track;
                document.getElementById('track-artist').textContent = song.artist;
                document.getElementById('playr-item').setAttribute('data-key', song.id);
                }
            })
        }
    },

    mountMedia: (ev) => {
        let clickedThing = ev.target;
        let track = clickedThing.closest('[data-key]');
        console.log(track);
        
        APP.media = new Media (
            APP.track[0].src, //how to target a specific one!
            APP.handleMediaSuccess, 
            APP.handleMediaError, 
            APP.handleMediaStatusChange 
        )
    },

    handleMediaSuccess: () => {
        console.log('WOOHOO! Successfully completed the media task')
    },

    handleMediaError: (error) => {
        console.log(CODES.error[code], CODES.error[message])
    },

    handleMediaStatusChange: () => {
        //optional parameter
    }, 

    play: () => { APP.media.play() },

    pause: () => { APP.media.pause() },
    
    fastForward: () => {
        APP.media.getCurrentPosition((currentPosition) => {
            const maxPosition = APP.media.getDuration(); // duration is built-in - values in seconds
            const newPosition = Math.min(maxPosition, currentPosition + 10); // adding 10 seconds

            APP.media.seekTo((newPosition) * 1000) //milliseconds -- advance it by 10 seconds
            console.log('Music is now fast forwarding:', {newPosition, maxPosition})
        });
    },

    rewind: () => {
        APP.media.getCurrentPosition((currentPosition) => { 
            const minPosition = 0; 
            const newPosition = Math.max(minPosition, currentPosition - 10); // subtracting 10 seconds
            APP.media.seekTo((newPosition) * 1000) //milliseconds -- rewind it by 10 seconds
            console.log('Music is now fast forwarding:', {newPosition, minPosition})
        });
    },

    toggleMute: () => {
        const buttonEl = document.getElementById('mute'); //event.target;
        if(APP.tracks.isMuted) {
            APP.media.setVolume(app.track.volume); //if muted, set back to last volume we were tracking
            APP.tracks.isMuted = false;
            buttonEl.textContent = 'Mute'; // if the volume is unmuted, tell the user a button they can click to mute
            console.log(`Volume now set at ${app.track.volume}`);
        }else {
            APP.media.setVolume(0) //if not muted, we want to mute it so set the volume to 0
            APP.tracks.isMuted = true;
            buttonEl.textContent = 'Unmute'; // if the volume is muted, tell the user a button they can click to unmute
            console.log(`Volume now set at 0`);
        }
    }


};

const ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";
document.addEventListener(ready, APP.init);


