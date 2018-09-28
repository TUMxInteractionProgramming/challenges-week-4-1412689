/* #6 start the #external #action and say hello */
console.log("App is alive");

var currentChannel;

currentChannel = sevencontinents;

var curentLocation = {
    latitude: 48.249586,
    longitude: 11.634431,
    what3words: "shelf.jetted.purple"
};
/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelObject Text which is set
 */
function switchChannel(channelObject) {
    //Log the channel switch
    console.log("Tuning in to channel", channelObject);

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channelObject.name;

    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/' + channelObject.createBy + '" target="_blank"><strong>' + channelObject.createBy +'</strong></a>';

    /* #6 #liking channels on #click */
    /* #7 #clob #trn remove either class */
    $('#chat h1 i').removeClass('fa-star fa-star-o');

    /* #7 #clob #trn set class according to object property */
    $('#chat h1 i').addClass(channelObject.starred ? 'fa-star' : 'fa-star-o');

    
    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelName + ')').addClass('selected');

    currentChannel = channelObject;
}

/* #6 #liking a channel on #click */
function star() {
    $('#chat h1 i').toggleClass('fa-star');
    $('#chat h1 i').toggleClass('fa-star-o');

    currentChannel.starred = !currentChannel.starred;

    $('#channels li:contains(' + currentChannel.name + ') .fa').removeClass('fa-star fa-star-o');
    $('#channels li:contains(' + currentChannel.name + ') .fa').addClass(currentChannel.starred ? 'fa-star' : 'fa-star-o');

}
/**
 * Function to select the given tab
 * @param tabId #id of the tab
 */

function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}


function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}
/**
 * This #constructor function creates a new chat #message.
 * @param text `String` a message text
 * @constructor
 */
function Message(text){
    this.createdBy = curentLocation.what3words;
    this.latitude = curentLocation.latitude;
    this.longitude = curentLocation.longitude;

    this.createdOn = new Date();
    this.expiresOn = new Date(Date.now() + 15 * 60* 1000);

    this.text =text;
    this.own = true;
}

function sendMessage() {
    
    var message = new Message($('#message').val());
    console.log("New message:", message);

    
    $('#messages').append(createMessageElement(message));

    
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));

    
    $('#message').val('');
}

/**
 * This function makes an html #element out of message objects' #properties.
 * @param messageObject a chat message object
 * @returns html element
 */
function createMessageElement(messageObject) {
    
    var expiresIn = Math.round((messageObject.expiresOn - Date.now()) / 1000 / 60);

    
    return '<div class="message'+
        
        (messageObject.own ? ' own' : '') +
        '">' +
        '<h3><a href="http://w3w.co/' + messageObject.createdBy + '" target="_blank">'+
        '<strong>' + messageObject.createdBy + '</strong></a>' +
        messageObject.createdOn.toLocaleString() +
        '<em>' + expiresIn+ ' min. left</em></h3>' +
        '<p>' + messageObject.text + '</p>' +
        '<button>+5 min.</button>' +
        '</div>';
}


function listChannels() {
    
    $('#channels ul').append(createChannelElement(yummy));
    $('#channels ul').append(createChannelElement(sevencontinents));
    $('#channels ul').append(createChannelElement(killerapp));
    $('#channels ul').append(createChannelElement(firstpersononmars));
    $('#channels ul').append(createChannelElement(octoberfest));
}

/**
 * This function makes a #new jQuery #channel <li> element out of a given object
 * @param channelObject a channel object
 * @returns {HTMLElement}
 */
function createChannelElement(channelObject) {
   

    // create a channel
    var channel = $('<li>').text(channelObject.name);

    
    var meta = $('<span>').addClass('channel-meta').appendTo(channel);

    
    $('<i>').addClass('fa').addClass(channelObject.starred ? 'fa-star' : 'fa-star-o').appendTo(meta);

    
    $('<span>').text(channelObject.expiresIn + ' min').appendTo(meta);
    $('<span>').text(channelObject.messageCount + ' new').appendTo(meta);

    
    $('<i>').addClass('fa').addClass('fa-chevron-right').appendTo(meta);

    
    return channel;
}