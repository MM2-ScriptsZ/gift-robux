const form = document.getElementById('user-form');
const usernameInput = document.getElementById('username');
const status = document.getElementById('status');
const profileCard = document.getElementById('profile-card');
const headshot = document.getElementById('headshot');
const displayNameEl = document.getElementById('display-name');
const accountNameEl = document.getElementById('account-name');
const profileLink = document.getElementById('profile-link');

const USER_SEARCH_URL = 'https://users.roblox.com/v1/users/search?keyword=';
const HEADSHOT_URL = 'https://www.roblox.com/headshot-thumbnail/image?userId=%USER_ID%&width=420&height=420&format=png';

function updateStatus(text, isError = false) {
  status.textContent = text;
  status.style.color = isError ? '#fda4af' : '#94a3b8';
}

function renderProfile(user) {
  const headshotSrc = HEADSHOT_URL.replace('%USER_ID%', user.id);
  headshot.src = headshotSrc;
  headshot.alt = `${user.displayName} headshot`;
  displayNameEl.textContent = user.displayName || user.name;
  accountNameEl.textContent = user.name;
  profileLink.href = `https://www.roblox.com/users/${user.id}/profile`;
  profileLink.textContent = 'View full Roblox profile';
  profileCard.classList.remove('hidden');
}

function findBestMatch(results, username) {
  const normalized = username.trim().toLowerCase();
  if (!results || results.length === 0) return null;
  const exact = results.find(user => user.name.toLowerCase() === normalized);
  return exact || results[0];
}

async function lookupUser(username) {
  updateStatus('Searching Roblox...', false);
  profileCard.classList.add('hidden');

  try {
    const response = await fetch(USER_SEARCH_URL + encodeURIComponent(username));
    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }
    const data = await response.json();
    const user = findBestMatch(data.data, username);
    if (!user) {
      updateStatus('No Roblox user found for that username.', true);
      return;
    }

    renderProfile(user);
    updateStatus(`Found ${user.displayName} (${user.name}). Verify before sending.`);
  } catch (error) {
    console.error(error);
    updateStatus('Unable to fetch Roblox information right now. Please try again later.', true);
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) {
    updateStatus('Please enter a Roblox username.', true);
    return;
  }
  lookupUser(username);
});

usernameInput.addEventListener('input', () => {
  if (usernameInput.value.trim().length === 0) {
    profileCard.classList.add('hidden');
    updateStatus('Search a username to display the Roblox avatar headshot and profile info.');
  }
});
