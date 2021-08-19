let container = document.querySelector('#post')

const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const ids = urlParams.get('id');
console.log(ids)

// refrencing database
let database = firebase.database().ref();

database.on('child_added', function(childData) {
    let blogData = childData.val();

    var postID = childData.key;

    if (ids == postID) {
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

        BlogPost.append(NameData, TitleData, MessageData);

        container.append(BlogPost)
    }
})