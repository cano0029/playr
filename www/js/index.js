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

const CODES = {// TO DO: move to a separate file?
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
    // TO DO: move to a separate resource folder? Does cordova support require/es6 modules? no...
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
            image: './img/donMclean.jpg',
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
    ],

    init: () => {
        APP.addListeners()
        APP.buildPlaylist()
        APP.colourAllSongsBtn()
    },

    addListeners: () => {
        // home page buttons
        document.getElementById('savedButton').addEventListener('click', APP.showSavePage)
        document.getElementById('allSongsButton').addEventListener('click', APP.displayAllSongs)
        // music controls
        document.getElementById('replay').addEventListener('click', APP.replay)
        document.getElementById('play').addEventListener('click', APP.play)
        document.getElementById('pause').addEventListener('click', APP.pause)
        document.getElementById('ff').addEventListener('click', APP.fastForward)
        document.getElementById('rw').addEventListener('click', APP.rewind)
        document.getElementById('mute').addEventListener('click', APP.toggleMute)
        document.getElementById('unmute').addEventListener('click', APP.toggleMute)
        // favourites/save button
        document.getElementById('like').addEventListener('click', APP.fillSaveIcon)
        // go to song card page
        document.getElementById('nextSong-container').addEventListener('click', APP.displaySongPage)
        document.getElementById('nowPlaying-container').addEventListener('click', APP.displaySongPage)
        // go to home page
        document.getElementById('btnClose').addEventListener('click', APP.displayHome)
    },

    buildPlaylist: () => {
        let playlist = document.getElementById('playlist')
        playlist.innerHTML = '';
        let docfragment = document.createDocumentFragment()
        
        APP.tracks.forEach((song => {
            let li = document.createElement('li')
            let div = document.createElement('div')
            let img = document.createElement('img')
            let title = document.createElement('h4')
            let artist = document.createElement('h6')

            // material icon that indicates which song is playing
            let musicOnDiv = document.createElement('div')
            let musicOnIndicator = document.createElement('span')
            musicOnIndicator.classList.add('material-icons')
            musicOnIndicator.innerHTML = 'audiotrack'
            musicOnDiv.classList.add('musicOn', 'hide')
            musicOnDiv.setAttribute('data-id', song.id)

            img.alt = 'track photo'
            img.src = song.image
            title.textContent = song.track;
            artist.textContent = song.artist
            li.setAttribute('data-key', song.id)
            
            li.append(img)
            div.append(title)
            div.append(artist)
            musicOnDiv.append(musicOnIndicator)
            li.append(div)
            li.append(musicOnDiv)
            docfragment.append(li);
            li.addEventListener("click", APP.displaySongPage)
        })
        )
        playlist.append(docfragment)
    },
    
    findSongId: () => {
        let dataKeyAttr = document.getElementById('playr-item').getAttribute('data-key')
        let id = parseInt(dataKeyAttr)
        return id
    },

    findSongDataKey: (ev) => {
        let clickedThing = ev.target;
        let track = clickedThing.closest('[data-key]');
        return track
    },

    checkSongPlaying: (ev) => {
        // TO DO: if it is not the same song, stop music else keep playing

        // currentSongId
        // let clickedSong = ev.target
        // let track = clickedThing.closest('[data-key]');
        // let currentSongId = parseInt(track.getAttribute('data-key'))

        //newSongId
        // getAttribute data-key from (playlist)

        let track = APP.findSongDataKey(ev)
        let index = parseInt(track.getAttribute('data-key'))
        let songId = APP.tracks[index].id
        // Doing the opposite here, but it works?? It doesnt, it just pauses everything
        if (APP.media != null && songId === index) {
            console.log('NOOO IM BEING STOPPED GOODBYE',  songId, index)
            APP.pause()
        } 

        APP.buildSongPage(track) 
    },

    buildSongPage: (track) => {
        if(track) {
            let id = parseInt(track.getAttribute('data-key'));
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
        APP.callSongPageFeatures(track)
    },

    callSongPageFeatures: (track) => {
        APP.mountMedia()
        APP.play()
        APP.getSongCurrentPosition()
        APP.getSongLength()
        APP.saveSongLength()
        APP.previewNextSong()
        APP.unfillSaveIcon(track)
    },

    mountMedia: () => {
        let id = APP.findSongId()
        let index = APP.tracks.findIndex(song => {
            return song.id === id 
        })

        APP.media = new Media (
            APP.tracks[index].src, 
            APP.handleMediaSuccess, 
            APP.handleMediaError, 
            APP.handleMediaStatusChange 
        )
    },
    
    handleMediaSuccess: () => {
        // optional - may remove if not using it
        console.log('WOOHOO! Successfully completed the media task')
    },

    handleMediaError: (error) => {
        console.log(CODES.error[error])
    },

    handleMediaStatusChange: (ev) => {
        console.log(CODES.status[ev])
    }, 

    play: () => { 
        APP.media.play()
        APP.showPauseButton()
        APP.toggleMusicOnButton()
        APP.songImageRotate()
    }, 
    
    pause: () => { 
        APP.media.pause()
        APP.showPlayButton()
        APP.toggleMusicOffButton()
        APP.hideMusicOnButton()
        APP.stopImageRotate()
    },
    
    fastForward: () => {
        APP.media.getCurrentPosition((currentPosition) => {
            const maxPosition = APP.media.getDuration(); 
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
        APP.media.play({ numberOfLoops: 1 })
        console.log('IAM REPLAYING')
    },
    
    release: () => {
        APP.media.release()
        console.log('I MADE IT HERE')
        APP.playNextSong()
    },

    toggleMute: () => {
        if (APP.tracks.isMuted) {
            APP.media.setVolume(1)
            APP.tracks.isMuted = false;
            APP.showMuteButton() 
            console.log(`Volume now set at ${APP.tracks.volume}`)
        } else {
            APP.media.setVolume(0) //if not muted, we want to mute it so set the volume to 0
            APP.tracks.isMuted = true
            APP.showUnmuteButton()
            console.log(`Volume now set at 0`)
        }
    },

    // PROGRESS BAR THINGS
    getSongCurrentPosition: () => {
        setInterval(function () {
            APP.media.getCurrentPosition( 
                // success callback
                function (position) {
                    if (position > -1) { // if it is actually playing
                        const minutes = Math.floor(position / 60)
                        const seconds = Math.floor(position - minutes * 60)
                        document.getElementById('progressBar').value = position // updates progress bar
                        document.getElementById('duration').innerHTML= minutes + ':' + (seconds < 10 ? '0' : '') + seconds
                        APP.finishedSong(position)
                    } 
                },
                // error callback
                function (error) {
                    console.log('Error getting position:' + error)
                }
            )
        }, 1000);
    },

    getSongLength: () => {
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

    saveSongLength: () => {
        let id = APP.findSongId()
        let index = APP.tracks.findIndex(song => {
            return song.id === id 
            }
        )

        const counter = 0;
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
        }, 1000)
    },
    
    finishedSong: (position) => {
        const maxPosition = Math.floor(APP.media.getDuration())
        const currentPosition = Math.floor(position)
        if (currentPosition === maxPosition || currentPosition ==- (maxPosition - 1)) { 
            return APP.release()
        } 
    },

    playNextSong: () => {
        // logic: keep track of position in array
        // listen for status fo event at the end of the song
        // release old media object before creating a new one

        let id = APP.findSongId()
        let index = APP.tracks.findIndex(song => {
            return song.id === id
        })
        if (index < APP.tracks.length -1) {
            let nextSong = index + 1
            APP.media = new Media (
                APP.tracks[nextSong].src, 
                APP.handleMediaSuccess, 
                APP.handleMediaError, 
                APP.handleMediaStatusChange 
            )
            APP.showNextSong(nextSong) 
        }
        APP.play()
        APP.getSongCurrentPosition()
        APP.getSongLength()
        APP.saveSongLength()
    },

    showNextSong: (nextSong) => {
        document.getElementById('track-image').src = APP.tracks[nextSong].image; 
        document.getElementById('track-title').textContent = APP.tracks[nextSong].track;
        document.getElementById('track-artist').textContent = APP.tracks[nextSong].artist;
        document.getElementById('playr-item').setAttribute('data-key', APP.tracks[nextSong].id);
    },
    
    buildSavedPage: () => {
        //TO DO: build saved page - works but replaces list item each time a new song is saved
        // might have to use local storage?
        let id = APP.findSongId()

        let savedList = document.getElementById('savedSongsList')
        savedList.innerHTML = '';
        let docfrag = document.createDocumentFragment()

        if (APP.media != null) {
            // document.getElementById('savedImage').src = APP.tracks[id].image
            // document.getElementById('savedTitle').textContent = APP.tracks[id].track
            // document.getElementById('savedArtist').textContent = APP.tracks[id].artist
            let li = document.createElement('li')
            let div = document.createElement('div')
            let img = document.createElement('img')
            let title = document.createElement('h4')
            let artist = document.createElement('h6')

            img.alt = 'song image'
            img.src = APP.tracks[id].image
            artist.textContent = APP.tracks[id].artist
            title.textContent = APP.tracks[id].track

            li.setAttribute('data-key', APP.tracks[id].id)

            li.append(img)
            div.append(title, artist)
            li.append(div)
            docfrag.append(li)

            li.addEventListener('click', APP.displaySongPage)
        
        }
        savedList.append(docfrag)
    },
    
    // DISPLAY PAGES/SECTIONS
    displayHome: () => {
        document.querySelector('.page.active').classList.remove('active')
        document.getElementById('home').classList.add('active')
        APP.nowPlaying()
        APP.hideMusicIndicators()
        APP.musicOnIndicator()
    },

    displaySongPage: (ev) => {
        document.querySelector('.page.active').classList.remove('active')
        document.getElementById('track').classList.add('active')
        APP.checkSongPlaying(ev)
    },

    showSavePage: () => {
        APP.displayHome()
        document.getElementById('playListPage').classList.remove('show')
        document.getElementById('playListPage').classList.add('hide')
        document.getElementById('savedPage').classList.remove('hide')
        document.getElementById('savedPage').classList.add('show')
        APP.colourSaveBtn()
        APP.uncolourAllSongsBtn()
    },

    displayAllSongs: () => {
        document.getElementById('savedPage').classList.remove('show')
        document.getElementById('savedPage').classList.add('hide')
        document.getElementById('playListPage').classList.remove('hide')
        document.getElementById('playListPage').classList.add('show')
        APP.colourAllSongsBtn()
        APP.uncolourSaveBtn()
    },
    
    // FEATURES
    nowPlaying: () => {
        let id = APP.findSongId()
        if (APP.media != null) {
            document.getElementById('nowPlaying-container').classList.remove('hide')
            document.getElementById('nowPlaying-container').classList.add('show')
            document.getElementById('nowPlaying-image').src = APP.tracks[id].image
            document.getElementById('nowPlaying').textContent = `Now Playing: ${APP.tracks[id].track} by ${APP.tracks[id].artist}`
        }
    },
    hideMusicIndicators: () => {

    },

    musicOnIndicator: () => {
        // TO DO: musicOn icon indicates which song is currently playing on homepage playlist
        let songPlayingId = APP.findSongId()

        // TO DO: move to separate function
        let cardDataKey = document.getElementById('playr-item').getAttribute('data-key')
        let playlistCardId = parseInt(cardDataKey)
        console.log('CINDERELLA', songPlayingId, playlistCardId)
        
        let playlist = document.getElementById('playlist')
        let songItem = playlist.querySelectorAll('li')
        console.log(songItem) //returns playlist list items as a nodelist
        
        if (songPlayingId === playlistCardId) {
            // if current song playing matches the id of card in the playlist, 
            // find musicOnIndicator that matches them and classlist remove, hide and add class show
            
            // TO DO: move to separate function
            let musicIcon = songItem[playlistCardId]
            console.log(musicIcon) // returns li item with index matching

            let musicIconDiv = musicIcon.childNodes[2]
            console.log(musicIconDiv) // finds div of musicIcon
            let musicIconDataId = musicIconDiv.getAttribute('data-id')
            let musicIconId = parseInt(musicIconDataId)
            console.log(musicIconId) // finds data-id of that specific musicIcon
            
            if (songPlayingId === musicIconId) {
                musicIconDiv.classList.remove('hide')
                musicIconDiv.classList.add('show')
            } 
            
        }

    },

    previewNextSong: () => {
        let index = APP.findSongId()
        let nextSong = index + 1
        if (index < APP.tracks.length - 1) {
            document.getElementById('nextSong').textContent =`Up Next: ${APP.tracks[nextSong].track} by ${APP.tracks[nextSong].artist}`
            document.getElementById('nextSong-container').setAttribute('data-key', APP.tracks[nextSong].id);
            APP.showNextSongButton()
        }
        else if (index = APP.tracks.length - 1) {
            document.getElementById('nextSong').textContent ='You are at the end of the playlist'
            APP.showSadFace()
        }
    },
    
    showConfirmSaved: () => {
        const message = 'This song has been added to your favourites list';
        const title = 'Success';
        const buttonName = 'OK';
        const alertCallback = () => {
        APP.buildSavedPage()
        }
    navigator.notification.alert(message,alertCallback,title, buttonName);
    },

    // BUTTONS

    colourAllSongsBtn: () => {
        APP.uncolourSaveBtn()
        let allSongsBtn = document.getElementById('allSongsButton')
        allSongsBtn.style.backgroundColor = '#ff0149'
        allSongsBtn.style.color = '#ffffff'
    },

    colourSaveBtn: () => {
        APP.uncolourAllSongsBtn()
        let saveBtn = document.getElementById('savedButton')
        saveBtn.style.backgroundColor = '#ff0149'
        saveBtn.style.color = '#ffffff'
    },

    uncolourAllSongsBtn: () => {
        let allSongsBtn = document.getElementById('allSongsButton')
        allSongsBtn.style.backgroundColor = '#d1d1d1'
        allSongsBtn.style.color = '#7b7b7b'
    },

    uncolourSaveBtn: () => {
        let saveBtn = document.getElementById('savedButton')
        saveBtn.style.backgroundColor = '#d1d1d1'
        saveBtn.style.color = '#7b7b7b'
    },

    showPauseButton: () => {
        document.getElementById('play').classList.remove('show')
        document.getElementById('play').classList.add('hide')
        document.getElementById('pause').classList.remove('hide')
        document.getElementById('pause').classList.add('show')
    },

    showPlayButton: () => {
        document.getElementById('pause').classList.remove('show')
        document.getElementById('pause').classList.add('hide')
        document.getElementById('play').classList.remove('hide')
        document.getElementById('play').classList.add('show')
    },

    showMuteButton: () => {
        document.getElementById('unmute').classList.remove('show')
        document.getElementById('unmute').classList.add('hide')
        document.getElementById('mute').classList.remove('hide')
        document.getElementById('mute').classList.add('show')
    },

    showUnmuteButton: () => {
        document.getElementById('mute').classList.remove('show')
        document.getElementById('mute').classList.add('hide')
        document.getElementById('unmute').classList.remove('hide')
        document.getElementById('unmute').classList.add('show')
    },

    toggleMusicOnButton: () => {
        document.getElementById('musicPaused').classList.remove('show')
        document.getElementById('musicPaused').classList.add('hide')
        document.getElementById('musicOn').classList.remove('hide')
        document.getElementById('musicOn').classList.add('show')
    },

    toggleMusicOffButton: () => {
        document.getElementById('track-image').classList.remove('rotate')
    },

    hideMusicOnButton: () => {
        document.getElementById('musicOn').classList.remove('show')
        document.getElementById('musicOn').classList.add('hide')
        document.getElementById('musicPaused').classList.remove('hide')
        document.getElementById('musicPaused').classList.add('show')
    },

    songImageRotate: () => {
        document.getElementById('track-image').classList.add('rotate')
    },

    stopImageRotate: () => {
        document.getElementById('track-image').classList.remove('rotate')
    },

    showNextSongButton: () => {
        document.getElementById('nextBtn').classList.remove('hide')
        document.getElementById('nextBtn').classList.add('show')
        document.getElementById('sadFace').classList.remove('show') 
        document.getElementById('sadFace').classList.add('hide') 
    },

    showSadFace: () => {
        document.getElementById('sadFace').classList.remove('hide') 
        document.getElementById('sadFace').classList.add('show') 
        document.getElementById('nextBtn').classList.remove('show')
        document.getElementById('nextBtn').classList.add('hide')

    },
    
    fillSaveIcon: (ev) => {
        let clickedThing = ev.target;
        let track = clickedThing.closest('[data-key]');
        if (track) {
            let id = parseInt(track.getAttribute('data-key'));
            console.log('I am track #', id)
            APP.tracks.find(song => {
                if (song.id === id) {
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
    
    unfillSaveIcon: (track) => {        
        if(track) {
            const id = parseInt(track.getAttribute('data-key'));
            console.log('I am track #', id)
            APP.tracks.find(song => {
                if (song.id !== id) {
                    document.getElementById('songLiked').classList.remove('show')
                    document.getElementById('songLiked').classList.add('hide')
                    document.getElementById('like').classList.remove('hide')
                    document.getElementById('like').classList.add('show')
                } 
            })
        }
    },

    // TO DO: 
    // put into separate functions: find index # of track in array, song id = data-key - keep em short, Math.floor, get songInformation
    // clean code, delete all console logs, comments, change function/variable names, delete let => const/lets?, fix get.attribute to get id and index == ids are index
    // clean up HTML, CSS
};

const ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";
document.addEventListener(ready, APP.init);