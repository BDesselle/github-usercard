/* GET Request */
axios
  .get('https://api.github.com/users/BDesselle')
  .then(data => {
    console.log('Data received', data);
  })
  .catch(err => {
    console.log('Data not available');
  });

/* GET Request */
axios
  .get('https://api.github.com/users/BDesselle')
  .then(data => {
    console.log('Data received');
    const myCard = cardCreator(data.data);
    const cardContainer = document.querySelector('.cards');
    cardContainer.appendChild(myCard);
    /* Pull and place follower data into followersArray */
    function followers(followersAPI) {
      axios
        .get(`${followersAPI}`)
        .then(data => {
          console.log('Follower Data Received', data);
          data.data.forEach(object => {
            followersArray.push(object.login);
          });
          /* Create cards for each user in followersArray */
          followersArray.forEach(arrayItem => {
            axios
              .get(`https://api.github.com/users/${arrayItem}`)
              .then(data => {
                const newCard = cardCreator(data.data);
                cardContainer.appendChild(newCard);
                console.log('Card Added');
              })
              .catch(err => {
                console.log('Card Creation Failed');
              });
          });
        })
        .catch(err => {
          console.log('Follower Data not available');
        });
    }
    followers(data.data.followers_url);
  })
  .catch(err => {
    console.log('Data not available');
  });

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell',
];

/* Component elements declared/scaffolded */
function cardCreator(userobject) {
  const userCard = document.createElement('div');
  const userImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const givenName = document.createElement('h3');
  const userName = document.createElement('p');
  const userLocation = document.createElement('p');
  const profileTitle = document.createElement('p');
  const profileLink = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const userBio = document.createElement('p');

  userCard.appendChild(userImg);
  userCard.appendChild(cardInfo);
  cardInfo.appendChild(givenName);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(userLocation);
  cardInfo.appendChild(profileTitle);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(userBio);
  profileTitle.appendChild(profileLink);

  userCard.classList.add('card');
  cardInfo.classList.add('card-info');
  givenName.classList.add('name');
  userName.classList.add('username');

  userImg.src = `${userobject.avatar_url}`;
  userImg.style.height = '150px';
  userImg.style.width = '150px';
  givenName.textContent = `${userobject.name}`;
  userName.textContent = `${userobject.login}`;
  userLocation.textContent = `${userobject.location}`;
  profileTitle.textContent = `Profile: ${profileLink}`;
  profileLink.href = `${userobject.html_url}`;
  profileLink.textContent = `${userobject.html_url}`;
  followers.textContent = `Followers: ${userobject.followers}`;
  following.textContent = `Following: ${userobject.following}`;
  userBio.textContent = `Bio: ${userobject.bio}`;

  return userCard;
}
