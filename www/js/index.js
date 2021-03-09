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
            id: 0,
            artist: 'Bob McFerrin',
            track: 'Dont Worry Be Happy',
            length: 0,
            image: './img/bobbyMcferrin.jpg',
            src: './media/dont-worry-be-happy.mp3',
            volume: 0.5
        },
        {
            id: 1,
            artist: 'Goo Goo Dolls',
            track: 'Come to Me',
            length: 0,
            image: './img/gooGooDolls.jpg',
            src: './media/come-to-me.mp3',
            volume: 0.5
        },
        {
            id: 2,
            artist: 'Imagine Dragons',
            track: 'Walking the Wire',
            length: 0,
            image: './img/imagineDragons.jpg',
            src: './media/walking-the-wire.mp3',
            volume: 0.5
        },
        {
            id: 3,
            artist: 'John Denver',
            track: 'Take me Home, Country Roads',
            length: 0,
            image: './img/johnDenver.jpg',
            src: './media/take-me-home.mp3',
            volume: 0.5
        },
        {
            id: 4,
            artist: 'X Ambassadors',
            track: 'Gorgeous',
            length: 0,
            image: './img/xAmbassadors.jpg',
            src: './media/gorgeous.mp3',
            volume: 0.5
        },
        {
            id: 5,
            artist: 'Don McLean',
            track: 'American Pie',
            length: 0,
            image: './img/donMcLean.png',
            src: './media/american-pie.mp3',
            volume: 0.5
        },
        {
            id: 6,
            artist: 'Van Morrison',
            track: 'Brown Eyed Girl',
            length: 0,
            image: './img/vanMorrison.jpg',
            src: './media/brown-eyed-girl.mp3',
            volume: 0.5
        },
        {
            id: 7,
            artist: 'Blue Swede',
            track: 'Hooked on a Feeling',
            length: 0,
            image: './img/blueSwede.jpg',
            src: './media/hooked-on-a-feeling.mp3',
            volume: 0.5
        },
        {
            id: 8,
            artist: 'Miguel',
            track: 'Pineapple Skies',
            length: 0,
            image: './img/miguel.jpg',
            src: './media/pineapple-skies.mp3',
            volume: 0.5
        },
        {
            id: 9,
            artist: 'Matroda',
            track: 'Forget It',
            length: 0,
            image: './img/matroda.jpg',
            src: './media/forget-it.mp3',
            volume: 0.5
        },
        {
            id: 10,
            artist: 'MGMT',
            track: 'Electric Feel',
            length: 0,
            image: './img/mgmt.jpg',
            src: './media/electric-feel.mp3',
            volume: 0.5
        },
        {
            id: 11,
            artist: 'Paul Simon',
            track: 'You Can Call Me Al',
            length: 0,
            image: './img/paulSimon.jpg',
            src: './media/you-can-call-me-al.mp3',
            volume: 0.5
        },

        // TO DO:add more songs
    ],

    init: () => {
        APP.addListeners()
        APP.showPlaylist()
    },

    addListeners: () => {
        document.getElementById('btnClose').addEventListener('click', APP.displayHome)
        document.getElementById('replay').addEventListener('click', APP.replay)
        document.getElementById('play').addEventListener('click', APP.play)
        document.getElementById('pause').addEventListener('click', APP.pause)
        document.getElementById('ff').addEventListener('click', APP.fastForward)
        document.getElementById('rw').addEventListener('click', APP.rewind)
        document.getElementById('mute').addEventListener('click', APP.toggleMute)
        document.getElementById('unmute').addEventListener('click', APP.toggleMute)
        document.getElementById('nextSong-container').addEventListener('click', APP.displaySongPage)
        document.getElementById('nowPlaying-container').addEventListener('click', APP.displaySongPage)
        document.getElementById('like').addEventListener('click', APP.fillSaveIcon)
        document.getElementById('savedButton').addEventListener('click', APP.showSavePage)
        document.getElementById('allSongsButton').addEventListener('click', APP.displayAllSongs)
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

        APP.nowPlaying()
    },

    displaySongPage: (ev) => {
        console.log('hi Im a song page')

        document.querySelector('.page.active').classList.remove('active')
        document.getElementById('track').classList.add('active')
    
        let clickedThing = ev.target;
        let track = clickedThing.closest('[data-key]');
        let index = parseInt(track.getAttribute('data-key'))
        console.log('ME TARZAN', index)
        
        // TO DO: find id of current song playing ?? IDK

        let songId = APP.tracks[index].id
        console.log('AHOY THERE', songId )

        // TO DO: if it is not the same song, stop music else keep playing
        // i am doing the opposite here, but it works?? It doesnt, it just pauses everything
        if (APP.media != null && songId === index) {
            console.log('NOOO IM BEING STOPPED GOODBYE',  songId, index)
            APP.pause()
        } 
        if (songId !== index) {
            APP.media.play()
        }
        
        APP.songCard(ev) 
    
    },

    songCard: (ev) => {
        let clickedThing = ev.target;
        let track = clickedThing.closest('[data-key]');

        
        if(track) {
            const id = parseInt(track.getAttribute('data-key'));
            console.log('I am track #', id)
            APP.tracks.find(song => {
                if (song.id === id) {
                document.getElementById('track-image').src = song.image; 
                document.getElementById('track-title').textContent = song.track;
                document.getElementById('track-artist').textContent = song.artist;
                document.getElementById('playr-item').setAttribute('data-key', song.id);
                document.getElementById('track-header').setAttribute('data-key', song.id)
                

                }
            })
        }

        APP.mountMedia(track)
        APP.play()
        APP.progressBar()
        APP.trackLength()
        APP.saveLength(track)
        APP.previewNextSong()
        APP.unfillSaveIcon(ev)
    },

    nowPlaying: () => {
        const dataKey = document.getElementById('playr-item').getAttribute('data-key')
        const id = parseInt(dataKey);
        if (APP.media != null) {
            document.getElementById('nowPlaying-container').classList.remove('hide')
            document.getElementById('nowPlaying-container').classList.add('show')

            document.getElementById('nowPlaying-image').src = APP.tracks[id].image
            document.getElementById('nowPlaying').textContent = `Listening to: ${APP.tracks[id].track} by ${APP.tracks[id].artist}`
        
        }
    },

    previewNextSong: () => {
        let dataKey = document.getElementById('playr-item').getAttribute('data-key')
        let index = parseInt(dataKey)
        let nextSong = index + 1
        if (index < APP.tracks.length - 1) {
            document.getElementById('nextSong').textContent =`Up Next: ${APP.tracks[nextSong].track} by ${APP.tracks[nextSong].artist}`
            document.getElementById('nextSong-container').setAttribute('data-key', APP.tracks[nextSong].id);

            document.getElementById('nextBtn').classList.remove('hide')
            document.getElementById('nextBtn').classList.add('show')
            document.getElementById('sadFace').classList.remove('show') 
            document.getElementById('sadFace').classList.add('hide') 
        }
        else if (index = APP.tracks.length - 1) {
            document.getElementById('nextSong').textContent ='You are at the end of the playlist'
            document.getElementById('sadFace').classList.remove('hide') 
            document.getElementById('sadFace').classList.add('show') 
            document.getElementById('nextBtn').classList.remove('show')
            document.getElementById('nextBtn').classList.add('hide')
        }
    },

    mountMedia: () => {
        let dataKey = document.getElementById('playr-item').getAttribute('data-key')
        let id = parseInt(dataKey)
        console.log('My song id is:' + id)
        let index = APP.tracks.findIndex(song => {
            return song.id === id 
            }
        )
        console.log('My index position is:' + index)
        APP.media = new Media (
            APP.tracks[index].src, 
            APP.handleMediaSuccess, 
            APP.handleMediaError, 
            APP.handleMediaStatusChange 
        )
        
    },

    handleMediaSuccess: () => {
        console.log('WOOHOO! Successfully completed the media task')
        // APP.release()
    },

    handleMediaError: (error) => {
        console.log(CODES.error[error])
    },

    handleMediaStatusChange: (ev) => {
        console.log(CODES.status[ev])
    }, 

    play: () => { 
        // TO DO: check if the same clicked song is currently playing, if it is resume playing at that position, else play

        APP.media.play()
        
        // TO DO: move to separate function - togglePlay
        document.getElementById('play').classList.remove('show')
        document.getElementById('play').classList.add('hide')
        document.getElementById('pause').classList.remove('hide')
        document.getElementById('pause').classList.add('show')

        // TO DO: move to sepfunction - ImageRotate
        document.getElementById('track-image').classList.add('rotate')

        // TO DO : move to separate function - musicOn element
        document.getElementById('musicPaused').classList.remove('show')
        document.getElementById('musicPaused').classList.add('hide')
        document.getElementById('musicOn').classList.remove('hide')
        document.getElementById('musicOn').classList.add('show')

    },

    release: () => {
        APP.media.release()
        console.log('I MADE IT HERE')
        APP.playNextSong()
    },

    playNextSong: () => {
        // TO DO: clean up, move some in different functions
        // logic: keep track of position in array
        // listen for status fo event at the end of the song
        // release old media object before creating a new one

        console.log('HEELLOOO I NEED TO PLAY NEXT SONG')

        let dataKey = document.getElementById('playr-item').getAttribute('data-key')
        let id = parseInt(dataKey)
        console.log(id)
        let index = APP.tracks.findIndex(song => {
            return song.id === id
        })
        
        const next = index + 1


        if (index < APP.tracks.length -1) {
            APP.media = new Media (
                APP.tracks[next].src, 
                APP.handleMediaSuccess, 
                APP.handleMediaError, 
                APP.handleMediaStatusChange 
            )
            document.getElementById('track-image').src = APP.tracks[next].image; 
            document.getElementById('track-title').textContent = APP.tracks[next].track;
            document.getElementById('track-artist').textContent = APP.tracks[next].artist;
            document.getElementById('playr-item').setAttribute('data-key', APP.tracks[next].id);
        }

        console.log(index)

        APP.play()
        APP.progressBar()
        APP.trackLength()
        APP.saveLength()
    },

    pause: () => { 
        APP.media.pause()

        // TO: move to separate function toggle Pause
        document.getElementById('pause').classList.remove('show')
        document.getElementById('pause').classList.add('hide')
        document.getElementById('play').classList.remove('hide')
        document.getElementById('play').classList.add('show')

        // TO DO : move to separate function - stopImageRotate
        document.getElementById('track-image').classList.remove('rotate')

        // TO DO : move to separate function - musicOn element
        document.getElementById('musicOn').classList.remove('show')
        document.getElementById('musicOn').classList.add('hide')
        document.getElementById('musicPaused').classList.remove('hide')
        document.getElementById('musicPaused').classList.add('show')

    },
    
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
            console.log('Music is now rewinding:', {newPosition, minPosition})
        });
    },

    replay: () => {
        console.log('IAM REPLAYING')
        APP.media.play({ numberOfLoops: 1 })
    },

    toggleMute: () => {
        const muteBtn = document.getElementById('mute') //event.target;
        const unmuteBtn = document.getElementById('unmute')
        if(APP.tracks.isMuted) {
            APP.media.setVolume(1)
            APP.tracks.isMuted = false;

            // TO DO: move to separate function
            // if the volume is unmuted, tell the user a button they can click to mute
            unmuteBtn.classList.remove('show')
            unmuteBtn.classList.add('hide')
            muteBtn.classList.remove('hide')
            muteBtn.classList.add('show')

            console.log(`Volume now set at ${APP.tracks.volume}`)
        }else {
            APP.media.setVolume(0) //if not muted, we want to mute it so set the volume to 0
            APP.tracks.isMuted = true

            // TO DO: move to separate function
            // if the volume is muted, tell the user a button they can click to unmute
            muteBtn.classList.remove('show')
            muteBtn.classList.add('hide')
            unmuteBtn.classList.remove('hide')
            unmuteBtn.classList.add('show')

            console.log(`Volume now set at 0`)
        }
    },

    progressBar: () => {
        setInterval(function () {
            // get media position
            APP.media.getCurrentPosition( 
                // success callback
                function (position) {
                    if (position > -1) { // if it is actually playing
                        const minutes = Math.floor(position / 60)
                        const seconds = Math.floor(position - minutes * 60)
                        document.getElementById('progressBar').value = position
                        document.getElementById('duration').innerHTML= minutes + ':' + (seconds < 10 ? '0' : '') + seconds
                        
                        APP.finishSongCheck(position)
                    } 
                },
                // error callback
                function (error) {
                    console.log('Error getting position:' + error)
                }
            )
        }, 1000);
    },

    trackLength: () => {

        const counter = 0;
        const timerDur = setInterval(function() {
            if (counter > 2000) {
                counter = counter + 100
                clearInterval(timerDur)
            }

            const duration = APP.media.getDuration()
            const minutes = Math.floor(duration / 60)
            const seconds = Math.floor(duration - minutes * 60)

            if (duration > 0) {
                clearInterval(timerDur);
                document.getElementById('trackLength').innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds
                document.getElementById('progressBar').max = duration 
            }
        }, 1000);

    },

    saveLength: (track) => {
        const counter = 0;
        let dataKey = document.getElementById('playr-item').getAttribute('data-key')
        let id = parseInt(dataKey)
        let index = APP.tracks.findIndex(song => {
            return song.id === id 
            }
        )
        console.log('FIND MY INDEX PLLLLEASE:' + index)

        const timerDur = setInterval(function() {
            if (counter > 2000) {
                counter = counter + 100
                clearInterval(timerDur)
            }

            const duration = APP.media.getDuration()
            const formatDur = Math.floor(duration)

            if (duration > 0) {
                APP.tracks[index].length = formatDur + ' ' + 'seconds';
                clearInterval(timerDur)
            }
            console.log('WHAT IS MY LENGTH??' + formatDur) 
            console.log(APP.tracks)
        }, 1000)
    },

    resumeSong: () => {

    },

    finishSongCheck: (position) => {
        const maxPosition = Math.floor(APP.media.getDuration())
        const currentPosition = Math.floor(position)
        console.log(currentPosition, maxPosition)
        if (currentPosition === maxPosition || currentPosition ==- (maxPosition - 1)) { //doesn't reach maxPosition sometimes
            return APP.release()
        } 
    },

    fillSaveIcon: (ev) => {

        let clickedThing = ev.target;
        let track = clickedThing.closest('[data-key]');

        
        if(track) {
            const id = parseInt(track.getAttribute('data-key'));
            console.log('I am track #', id)
            APP.tracks.find(song => {
                if (song.id === id) {
                    console.log('I AM GOING TO THE SAVED PAGE', song.id, id)
                    document.getElementById('like').classList.remove('show')
                    document.getElementById('like').classList.add('hide')
                    document.getElementById('songLiked').classList.remove('hide')
                    document.getElementById('songLiked').classList.add('show')

                    APP.showConfirmSaved()
                }
            })
        }

        APP.buildSavedPage(ev)
    },

    showConfirmSaved: () => {
        const message = 'This song will be added to your saved list';
        const title = 'Saved';
        const buttonName = 'OK';
        const alertCallback = () => {
        // do stuff when dialog closes - 
        // when user click OK, alert closes then this callback function runs
        APP.buildSavedPage()
        }

    navigator.notification.alert(message,alertCallback,title, buttonName);
    },

    unfillSaveIcon: (ev) => {
        
        let clickedThing = ev.target;
        let track = clickedThing.closest('[data-key]');

        
        if(track) {
            const id = parseInt(track.getAttribute('data-key'));
            console.log('I am track #', id)
            APP.tracks.find(song => {
                if (song.id !== id) {
                    console.log('I AM NOT GOING TO THE SAVED PAGE', song.id, id)
                    document.getElementById('songLiked').classList.remove('show')
                    document.getElementById('songLiked').classList.add('hide')
                    document.getElementById('like').classList.remove('hide')
                    document.getElementById('like').classList.add('show')
        
                } 
            })
        }
    },

    buildSavedPage: (ev) => {
        //TO DO: build saved page - works but replaces list item each time a new song is saved
        // might have to use local storage?
        console.log('Will come back later to build this list')
        const dataKey = document.getElementById('playr-item').getAttribute('data-key')
        const id = parseInt(dataKey);

        let list = document.getElementById('savedSongsList')
        list.innerHTML = '';
        let df = document.createDocumentFragment()

        if (APP.media != null) {
            // document.getElementById('savedImage').src = APP.tracks[id].image
            // document.getElementById('savedTitle').textContent = APP.tracks[id].track
            // document.getElementById('savedArtist').textContent = APP.tracks[id].artist
            let li = document.createElement('li')
            let div = document.createElement('div')
            let img = document.createElement('img')
            let artist = document.createElement('h6')
            let title = document.createElement('h4')

            img.alt = 'song image'
            img.src = APP.tracks[id].image
            artist.textContent = APP.tracks[id].artist
            title.textContent = APP.tracks[id].track

            li.setAttribute('data-key', APP.tracks[id].id)

            li.append(img)
            div.append(title, artist)
            li.append(div)
            df.append(li)

            li.addEventListener('click', APP.displaySongPage)
        
        }
        list.append(df)
    },

    showSavePage: () => {
        APP.displayHome()
        document.getElementById('playListPage').classList.remove('show')
        document.getElementById('playListPage').classList.add('hide')
        document.getElementById('savedPage').classList.remove('hide')
        document.getElementById('savedPage').classList.add('show')
    },

    displayAllSongs: () => {
        document.getElementById('savedPage').classList.remove('show')
        document.getElementById('savedPage').classList.add('hide')
        document.getElementById('playListPage').classList.remove('hide')
        document.getElementById('playListPage').classList.add('show')
    }

    // TO DO: put into separate functions: find index # of track in array, song id = data-key - keep em short, Math.floor, get songInformation
    // TO DO: clean code, delete all console logs, comments, change function/variable names, delete let => const, fix get.attribute to get id and index == ids are index
};

const ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";
document.addEventListener(ready, APP.init);

