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

const APP = {
    tracks: [
        {
            id: 412,
            artist: 'Bob McFerrin',
            track: 'Dont Worry Be Happy',
            length: 0,
            image: './img/jasonLeung-unsplash.jpg',
            path: './media/bob-mcferrin/dont-worry-be-happy.mp3',
        },
        {
            id: 222,
            artist: 'Goo Goo Dolls',
            track: 'Come to Me',
            length: 0,
            image: './img/gooGooDolls.jpg',
            path: './media/goo-goo-dolls/come-to-me.mp3',
        },
        {
            id: 141,
            artist: 'Imagine Dragons',
            track: 'Walking the Wire',
            length: 0,
            image: './img/imagineDragons.jpg',
            path: './media/imagine-dragons/walking-the-wire.mp3',
        },
        {
            id: 312,
            artist: 'John Denver',
            track: 'Take me Home, Country Roads',
            length: 0,
            image: './img/johnDenver.jpg',
            path: './media/john-denver/take-me-home.mp3',
        },
        {
            id: 566,
            artist: 'X Ambassadors',
            track: 'Gorgeous',
            length: 0,
            image: './img/xAmbassadors.jpg',
            path: './media/x-ambassadors/gorgeous.mp3',
        },
    ],
    init: () => {
        APP.addListeners()
        APP.showPlaylist()
    },
    addListeners: () => {
        document.getElementById('btnClose').addEventListener('click', APP.displayHome)
    },
    showPlaylist: () => {
        console.log("suhhh dude");
        let list = document.getElementById('playlist')
        list.innerHTML = '';
        let df = document.createDocumentFragment()
        APP.tracks.forEach((song => {
            let li = document.createElement('li')
            let img = document.createElement('img')
            let title = document.createElement('h1')
            let artist = document.createElement('h3') 

            img.alt = 'track photo'
            img.src = song.image
            title.textContent = song.track;
            artist.textContent = song.artist

            li.setAttribute('data-key', song.id)
            
            li.append(img)
            li.append(title)
            li.append(artist)

            df.append(li);

            li.addEventListener("click", APP.displaySong)
        })
        )
        list.append(df)
    },
    displayHome: () => {
        document.querySelector('.page.active').classList.remove('active');
        document.getElementById('home').classList.add('active');
    },
    displaySong: () => {
        console.log('hi')
        document.querySelector('.page.active').classList.remove('active');
        document.getElementById('track').classList.add('active');
    }
};

const ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";
document.addEventListener(ready, APP.init);


