const options = {
  year: 'numeric',
  day: 'numeric',
  month: 'long',
  hour12: false,
  hour: '2-digit',
  minute: '2-digit'
};

function formatUnixTime(unixTime) {
  return new Date(unixTime * 1000).toLocaleTimeString('en-US', options);
}


export default formatUnixTime;
