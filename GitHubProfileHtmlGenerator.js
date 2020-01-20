const axios = require('axios');
async function htmlGenerator(username, backgroundColor) {
    console.log("htmlGenerator is called- username:" + username + " color:" + backgroundColor);
    let newHtml;
    
    const githubUrlRequest = `https://api.github.com/users/${username}`;
    console.log("API URL:" + githubUrlRequest);

    const promise1 = axios.get(githubUrlRequest);
    const promise2 = axios.get(githubUrlRequest + '/starred');

    await Promise.all([promise1, promise2]).then(function (values) {
        let returnedProfileData = values[0].data;
        let StarredCount = values[1].data.length;
        newHtml = generateHtml(returnedProfileData, StarredCount, backgroundColor);

    });
    return newHtml;
}

function generateHtml(response, StarredCount, backgroundColor) {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>GitHub Profile: ${response.name}</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css"/>
            <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
            <style>
                ul{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;
                }
                body {
                    background-color: white;
                    -webkit-print-color-adjust: exact !important;
                    font-family: 'Montserrat', sans-serif;
                }
                img {
                    height: 100%;
                    width: auto;
                    border-radius: 50%;
                }
                h1 {
                    font-size: 28px;
                    font-weight: bold;
                } 
                .header-text {
                    font-size: 32px;
                    font-weight: bold;
                }
                .mega-container{
                    display: grid;
                    grid-template-rows: 50px 50px 100px 1fr 1fr 10%; 
                    grid-template-columns: 5% 15% 30% 30% 15% 5%;
                    justify-content: center;
                    background-color: ${backgroundColor};
                    row-gap: 10px;
                }
                .profile-pic {
                    justify-self: center;
                    grid-row: 2/4;
                    grid-column: 2/6;
                    z-index: 0;
                    
                }
        
                .header-container{
                    display: grid;
                    grid-row: 3/5;
                    grid-column: 2 / span 4;
                    grid-template-rows: 50px 50px auto auto auto;
                    grid-template-columns: 10% 80% 10%;
                    background-color: lightskyblue;
                    border-radius: 5px;
                    align-items: center;
                }
        
        
                    .header-text {
                        justify-self: center;
                    }
                    .greeting {
                        grid-row: 3/4;
                        grid-column: 2/3;
                    }
                    .name {
                        grid-row: 4/5;
                        grid-column: 2/3;
                    }
                    .links {
                        grid-row: 5/6;
                        grid-column: 2/3;
                    }
        
        
                .main-container{
                    display: grid;
                    background-color: white;
                    grid-row: 5/6;
                    grid-column: 2 / span 4;
                    grid-template-rows: 10px auto 1fr 1fr 30px;
                    grid-template-columns: 10% 1fr 1fr 10%;
                    gap: 10px 10px;
                    border-radius: 5px;
                }
        
                .card{
                    background: ${backgroundColor};
                    border-radius: 5px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 10px 0px 10px 0px;
                }
                .card-margin{
                    margin-bottom: 10px;
                }
                .bio {
                    grid-area: 2 / 2 / 3 / 4;
                    justify-self: center;
                    align-self: center;
                    font-size: 20px;
                }
        
                .repositories {
                    grid-area: 3 / 2 / 4 / 3
                }
        
                .followers {
                    grid-area: 3 / 3 / 4 / 4
                }
        
                .github-stars {
                    grid-area: 4 / 2 / 5 / 3
                }
        
                .following {
                    grid-area: 4 / 3 / 5 / 4
                }
        
                .link a {
                    color: blue;
                    text-decoration: none;
                    font-size: 24px;
                }
            </style>
        </head>
        <body>
            <div class = mega-container>
                <img class = "profile-pic" src="${response.avatar_url}"/>
                <header class = "header-container">
                    <div class = "header-text greeting">
                        Hi!
                    </div>
                    <div class = "header-text name">My name is ${response.name}!</div>
                    <div class = "item5 links">
                        <ul>
                            <li id="location" class="link"><a href="https://www.google.com/maps/search/?api=1&${response.location}">${response.location}</a></li>
                            <li id="htmlUrl" class="link"><a href="${response.html_url}">Github</a></li>
                            <li id="blog" class="link"><a href="${response.blog}">Blog</a></li>
                        </ul>
                    </div>
                </header>
                <main class ="main-container">
                    <div class ="item6 bio">${response.bio}</div>
                    <div class="card repositories">
                        <h1 class="card-margin">Public Repositories</h1>
                        <p id="repository-count">${response.public_repos}</p>
                    </div>
                    <div class="card followers">
                        <h1 class="card-margin">Followers</h1>
                        <p id="followers-count">${response.followers}</p>
                    </div>
                    <div class="card github-stars">
                        <h1 class="card-margin">GitHub Stars</h1>
                        <p id="star-count">${StarredCount}</p>
                    </div>
                    <div class="card following">
                        <h1 class="card-margin">Following</h1>
                        <p id="following-count">${response.following}</p>
                    </div>
                </main>
            </div>
        </body>
        </html>`
    return htmlContent;
};

module.exports = { getHTML: htmlGenerator };
