const PREFIX = "$";

const validateCommand = (message) => {
  let valid = false;
  let arg = '';
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    if (args.length > 0  && CMD_NAME.toLowerCase() === 'qr') {
        valid = true;
        arg = args.join(" ");
    }
  }

  return {
    isValid: valid,
    arg: arg,
  };
};

module.exports = validateCommand;
