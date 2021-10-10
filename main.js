// Global array to hold post data and global index to keep track of post index
var posts = [];
var index = 0;

$(document).ready(function() {
    // Fetch data from Reddit API in JSON format
    $.getJSON("https://www.reddit.com/r/business/.json", function (jsonData) {
        // Put useful data from JSON into posts array
        jsonData["data"]["children"].forEach((post, i) => {
            posts.push ({
                "title": post["data"]["title"],
                "comments": post["data"]["num_comments"],
                "author": post["data"]["author"],
                "link": post["data"]["permalink"]
            });
        });
        renderPosts();
    });

    // Assign click handlers for next/prev buttons and posts
    $("#btn-next").click(function () {
        next();
    });

    $("#btn-prev").click(function () {
        prev();
    });

    $(".post").click(function () {
        window.open("https://www.reddit.com" + posts[index + $(".post").index($(this))]["link"], '_blank').focus();
    });

});

// Put information from posts array into the post elements
function renderPosts() {
    var postElems = $(".post");
    var i = 0;
    postElems.each(function(elem) {
        $(this).fadeOut("fast", function() {
            $(this).children(".post-title").text(posts[index + i]["title"]);
            $(this).find(".comments").text(posts[index + i]["comments"] + " comments");
            $(this).find(".author").text("submitted by " + posts[index + i]["author"]);

            $(this).fadeIn("fast");
            i++;
        });
    });
}

// Increase index by 4 if possible, grey out button if it has reached the end
function next() {
    if (index + 4 < posts.length - 4) {
        if (index == 0) {
            activateButton($("#btn-prev"));
        }
        index += 4;
        if (index + 4 > posts.length - 4) {
            greyButton($("#btn-next"));
        }
        renderPosts();
    }
}

// Decrease index by 4 if possible, grey out button if it has reached the beginning
function prev() {
    if (index - 4 >= 0) {
        if (index - 4 < posts.length - 4) {
            activateButton($("#btn-next"));
        }
        index -= 4;
        if (index - 4 < 0) {
            greyButton($("#btn-prev"));
        }
        renderPosts();
    }
}

// Change button classes to greyed out
function greyButton(btn) {
    btn.attr("class", "btn btn-greyed btn-outline-secondary");
}

// Change button classes to green color
function activateButton(btn) {
    btn.attr("class", "btn btn-success");
}
