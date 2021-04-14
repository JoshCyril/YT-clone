// Options
const CLIENT_ID =
  "521764728223-aack9vsuu5j4snbd4lvpsl38njbj5k7s.apps.googleusercontent.com";
// const CLIENT_ID = null;
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/youtube.readonly";

const authorizeButton = document.getElementById("authorize-button");
const signoutButton = document.getElementById("signout-button");
const content = document.getElementById("content");
const channelForm = document.getElementById("channel-form");
const channelInput = document.getElementById("channel-input");
const videoContainer = document.getElementById("video-container");

const defaultChannel = "Apple";

// Form submit and change channel
channelForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const channel = channelInput.value;

  getChannel(channel);
});

// Load auth2 library
function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

// Init API client library and set up sign in listeners
function initClient() {
  gapi.client
    .init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES,
    })
    .then(() => {
      // Listen for sign in state changes
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      // Handle initial sign in state
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
}

// Update UI sign in state changes
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = "none";
    signoutButton.style.display = "block";
    content.style.display = "block";
    videoContainer.style.display = "flex";
    getChannel(defaultChannel);
  } else {
    authorizeButton.style.display = "block";
    signoutButton.style.display = "none";
    content.style.display = "none";
    videoContainer.style.display = "none";
  }
}

// Handle login
function handleAuthClick() {
  gapi.auth2.getAuthInstance().signIn();
  var profile = gapi.auth2.getBasicProfile();
  // console.log("ID: " + profile.getId());
  // console.log("Full Name: " + profile.getName());
  // console.log("Given Name: " + profile.getGivenName());
  // console.log("Family Name: " + profile.getFamilyName());
  // console.log("Image URL: " + profile.getImageUrl());
  // console.log("Email: " + profile.getEmail());
}

// Handle logout
function handleSignoutClick() {
  gapi.auth2.getAuthInstance().signOut();
}
// Display channel data
function showChannelData(data) {
  const channelData = document.getElementById("channel-data");
  channelData.innerHTML = data;
}

// Get channel from API
function getChannel(channel) {
  gapi.client.youtube.channels
    .list({
      part: "snippet,contentDetails,statistics",
      forUsername: channel,
    })
    .then((response) => {
      const channel = response.result.items[0];

      const output = `
      <ul class="collection tect-d" type='none'>
        <li class="collection-item text-d mb-2"><b>Title:</b> ${
          channel.snippet.title
        }</li>
        <li class="collection-item text-d mb-2"><b>Subscribers:</b> ${numberWithCommas(
          channel.statistics.subscriberCount
        )}</li>
        <li class="collection-item text-d mb-2"><b>Views:</b> ${numberWithCommas(
          channel.statistics.viewCount
        )}</li>
        <li class="collection-item text-d mb-2"><b>Videos:</b> ${numberWithCommas(
          channel.statistics.videoCount
        )}</li>
      </ul>
      <p class='text-justify text-d'>${channel.snippet.description}</p>
      <hr>
      <p class="btn btn-outline-info text-d"><b>Country: </b>${
        channel.snippet.country
      }</p>
    `;
      tagLine.innerHTML = `Latest Video 💠 ${channel.snippet.title}`;
      showChannelData(output);

      const playlistId = channel.contentDetails.relatedPlaylists.uploads;
      requestVideoPlaylist(playlistId);
    })
    .catch((err) => alert("No Channel By That Name"));
}

// Add commas to number
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function requestVideoPlaylist(playlistId) {
  const requestOptions = {
    playlistId: playlistId,
    part: "snippet,contentDetails",
    maxResults: 10,
  };

  const request = gapi.client.youtube.playlistItems.list(requestOptions);
  const tagLine = document.getElementById("tagLine");

  request.execute((response) => {
    const playListItems = response.result.items;
    if (playListItems) {
      let output = "";

      // Loop through videos and append output
      playListItems.forEach((item) => {
        const videoId = item.snippet.resourceId.videoId;
        const Title = item.snippet.title;
        const ChannelName = item.snippet.channelTitle;
        const DateNTime = item.snippet.publishedAt.split("T");
        const Dated = DateNTime[0];
        const Video = item.snippet.resourceId.kind.split("#");
        const VideoType = Video[1];

        output += `
        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4">
             <div class="card" id='card'>
                <iframe
                  class="embed-responsive-item img-fluid"
                  src="//www.youtube.com/embed/${videoId}"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
                <div class="card-body row">

                  <div class="col-12 p-0">
                    <h5 class="card-title mb-2">${Title}</h5>
                    <p class="card-text mb-0">${ChannelName}</p>
                    <p class="card-text">${Dated} • Type ${VideoType}</p>
                  </div>
                </div>
              </div>
        </div>
      `;
      });

      // Output videos
      videoContainer.innerHTML = output;
    } else {
      videoContainer.innerHTML = "No Uploaded Videos";
      tagLine.innerHTML = "No Uploaded Videos";
    }
  });
}
