document.addEventListener("DOMContentLoaded", function() {
    function showTab(hash) {
        var contentTabs = document.getElementById("content").children;
        for (var j = 0; j < contentTabs.length; j++) {
            contentTabs[j].style.display = "none"; // hide all tabs
            var children = contentTabs[j].getElementsByClassName("x");
            for(var k = 0; k < children.length; k++) {
                children[k].classList.remove("animate__animated");
            }
        }
        var contentId = "content-" + hash.split("-")[1];
        var activeTab = document.getElementById(contentId);
        activeTab.style.display = "block"; // show the clicked tab's content
        var activeChildren = activeTab.getElementsByClassName("x");
        for(var k = 0; k < activeChildren.length; k++) {
            activeChildren[k].classList.add("animate__animated"); // add the animation
        }

        var tabs = document.getElementsByClassName("tablink");
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove("active");
            if ("#" + tabs[i].getAttribute("href").split("#")[1] == hash) {
                tabs[i].classList.add("active");
            }
        }
    }

    window.addEventListener("hashchange", function() {
        showTab(window.location.hash);
    });

    if(window.location.hash) {
        showTab(window.location.hash);
    }
});
