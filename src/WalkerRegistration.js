console.log("walker reg script loaded!");
console.log("Script can read:", USERNAME, "From mainjs");
let RegPageBtn = document.getElementById('regpage');
RegPageBtn.addEventListener('click',function(){
    content_handler('WalkerRegistration');
});

/*Register logedin user as a walker */
function register_as_walker(TypeOfWalker) {

    $.ajax({
        type: 'POST',
        url: 'src/API/booking/getresources_XML.php',
        data: {
            ID: encodeURIComponent(resID),
            name: encodeURIComponent(searchvalue),
            type: encodeURIComponent('walkbook'),
            company: encodeURIComponent(TypeOfWalker),
            location: encodeURIComponent(SearchWalker),
            category: encodeURIComponent(TypeOfWalker),
            cost: encodeURIComponent(resType),
            size: encodeURIComponent(resType)
        },
        success: registered_as_resource,
        error: status_msg
    });
}

function registered_as_resource(returnedData) {
    console.log("User registered as walker")
}

/*
ID REQUIREDID of the reresource
name REQUIREDName of the resource
type REQUIREDApplication type in the example Hotel_Demo
company REQUIREDCompany of the resource
location REQUIREDLocation of the resource
category REQUIREDCategory of the resource
cost REQUIREDCost of the resource*/