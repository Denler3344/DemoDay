// container for post
let container = document.querySelector('#container');

//forms
let title = document.querySelector('#title');
let message = document.querySelector('#message');
let name = document.querySelector('#name');

const d = new Date();

// post button
let submit = document.querySelector('#Post');

// refrencing database
let database = firebase.database().ref();

// loading information from the database
database.on('child_added', function(childData) {
    let blogData = childData.val();

    var postID = childData.key;

    let anchor = document.createElement('a');
    anchor.href = './SubWeb/BlogPost/blog.html?id=' + postID;
    anchor.target = '_blank'
    anchor.id = postID;

    let BlogPost = document.createElement('div');
    
    let NameData = document.createElement('p');
    // class name for name data
    NameData.className = 'BlogName';
    NameData.innerHTML = blogData.NAME;
    
    let TitleData = document.createElement('p');
    // class name for title data
    TitleData.className = 'BlogTitle';
    TitleData.innerHTML = blogData.TITLE

    let MessageData = document.createElement('p');
    // class name for message data
    MessageData.className = 'BlogMessage'
    MessageData.innerHTML = blogData.MESSAGE

    let TimeData = document.createElement('p')
    TimeData.className = 'BlogTime';
    TimeData.innerHTML = blogData.TIME;
    
    // adds all the data into a div      
    BlogPost.append(NameData, TitleData, MessageData, TimeData);

    // adds the div to the anchor
    anchor.append(BlogPost);

    // stores said div in the div container
    container.append(anchor)
});

// pushing data to the database
submit.onclick = function updateDB(event){
    event.preventDefault(); //stop refreshing

    // stores user input and assigns it a value for the databse to use and store
    let titleData = title.value;
    let messageData  = message.value;
    let usernameData = name.value;
    let timeData = d.getHours() + ':' + d.getMinutes() + "  -  " + d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate();

    // Update database here
    let value = {
        TITLE: titleData,
        MESSAGE: messageData,
        NAME: usernameData,
        TIME: timeData
    }

    database.push(value)
} 

