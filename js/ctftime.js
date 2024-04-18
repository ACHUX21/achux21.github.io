fetch('https://cors-anywhere.herokuapp.com/https://ctftime.org/api/v1/teams/220336/', {
    headers: {
      'Accept': 'application/json',
    }
  })
    .then(response => response.json())
    .then(data => {
      // Access the rating place for the year 2024
      const ratingPlace2024 = data.rating["2024"].rating_place;
      const subtitleText = `<p class="line-1 anim-typewriter">L3ak<br>International CTF team of cybersecurity researchers and enthusiasts.<br>Ranked #${ratingPlace2024}</p>`;
      document.getElementById('div-subtitle').innerHTML = subtitleText;
      console.log('Rating place for 2024:', ratingPlace2024);

    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });