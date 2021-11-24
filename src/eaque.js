const CommandContext = require('./class/command_context');
const ParseCommand = require('./class/parse_command');
const Lexer = require('./lexer.js');
const Parser = require('./parser.js')

class Eaque {

    static tokenType = {
      KEYWORD : "KEYWORD_TOKEN",
      END : "END_TOKEN",
      OPT_ARG_START : "OPT_ARG_START_TOKEN",
      NUMBER : "NUMBER_TOKEN",
      STRING : "STRING_TOKEN",
      BOOL : "BOOL_TOKEN",
      TIME : "TIME_TOKEN",
      DATE : "DATE_TOKEN",
      COLOR : "COLOR_TOKEN",
      USER : "USER_TOKEN",
      CHANNEL : "CHANNEL_TOKEN",
      ROLE : "ROLE_TOKEN"
    }
  
    static DIGITS = "0123456789";
  
    static TIMES = {
      s : 1,
      m : 60,
      h : 3600,
      d : 86400,
      M : 2592000,
      Y : 31536000
    }
  
    /**
     * 
     * @param {String} args All the comand arguments unless the prefix and the command name
     * @param {ParseCommand} command An object that inherits ParseCommand to store the possible keywords and optional arguments
     * @param {Discord.Client} client The Client that reads the command
     * @param {Discord.Guild} guild The Guild where the command was posted
     * @returns {CommandContext} All the info in the Command
     */
  
    static readCommand(args, command, client, guild) {
      let lexer = new Lexer(args, command, client, guild, Eaque);
      var tokens = lexer.makeTokens();
      let parser = new Parser(tokens, command, Eaque);
      var ctx = parser.parseTokens();
  
      return ctx;
    }
  
  }
  
  module.exports = Eaque;