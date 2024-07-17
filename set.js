const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUQwSnJBbGhOV2p3YW5Qc3IxL1pNZjR4blhRaWJLTjk5SmRHcDRyYTVGMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibmdKSXJXbFdSOERvdC8xUFVEV3JWMHhUcXFpQlJXVXI0V1ZNaURpME0xVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3RkpwMjNZZ3RXK2h1Z2kvZllUQTVYL0QzTnZaL016RUtHbmhBRjNtVlVnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLUmk0L0dPbW9SejZiN1hDYUVNQ3pnREhJWVBxV1VGWW9NQXFUeTc2eVcwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlIR0loY0pxNm5CZDQzTFlBOFJZaDcxdUM1WVRFc2tkYWJqYzdGczNHMVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1VUnhhOUtGalYzZXJOdnVIZzNwdnB1c0hDc01hU2RSRGQ3aU1GQ2tISEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0NpNFR6NEx3UXFsengyZzhJUGswMW9lemU1bEJvSkRFak1uZ01NeXpHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ3FnS2NWZU5LYVZjK2xTOXhNUDFyMFM1OUU5R2d5bWplNGFWVkw4UHQyQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZMYmlCamtFSnU1b0N2OEwyQTgxYm9mekhqQ001cGkyNmNzQXAyNkhma0ZaUHdzSUc0K09ZbHZlQWR3alVHY1lYOW1MRmxUbXNKTUN2MzZ1OFRlQmlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjU1LCJhZHZTZWNyZXRLZXkiOiIzaEFTeVM5czI4RXJLVUtQL0ZIZEV4YkxVc0xTMHowaGM0Z2QvQmxXRnVFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJXNGZSWGs1QlFPdVVRZ00tNlA1cmhBIiwicGhvbmVJZCI6ImFiMDhiZDUwLWM2NTQtNGEzZi05ZmNjLTdkNmRhZjE5OWQzMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZd2dza2FKbmYra0JHRjI5RGh2NEQ5MS93bGM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib1RzZlZBemFtQkdyc09RNEk4aHlUVDBTMHJJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJYUldHTU1YIiwibWUiOnsiaWQiOiIyNjM3MTEzNDg4MDE6NjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiVGFsa21vcmUifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pTQStpUVFzbzdndEFZWUJpQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkVKd3htcDNORmpaaXhKZEx3S2VreE50WGlMS0VoQUF4S3h2QjhWZDBNQzg9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjB6Zm13QjlSR091WHlYSWlQaFl6UVZxNlhTZStaSzlKanVuak80QjBCQTF4R1Zzb3IwdGlMajF4WFhzcFFzTVBhVlQ2WFRBQWF0blNsanNoeWFpOEJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI4RnBvM2x2bHNFaFFsRUl4SkVFZjQ2Z3FzYW9VdGZONjFSVElzL3QvWmEzOFJ1aFN0NHhpTWZNKzA1NURiM2dMWU8wWmFuOFExdFpPZktOOThjeENpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxMTM0ODgwMTo2OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSQ2NNWnFkelJZMllzU1hTOENucE1UYlY0aXloSVFBTVNzYndmRlhkREF2In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMjM5MzU5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVyaSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
