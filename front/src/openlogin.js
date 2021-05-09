import OpenLogin from "@toruslabs/openlogin";

let openlogin = null;

async function getOpenLogin() {
  if (!openlogin) {
    openlogin = new OpenLogin({
      clientId:
        "BGPuib5ZOfZ1On2vP66kKaruWjqMUlY_PnIlfihR1AiI-ug7RsatiqqzrImWgXNMtCdYBo11wmT4lMi6VNDD8ro",
      network: "testnet",
      //  iframeUrl: "http://beta.openlogin.com"
    });
    await openlogin.init();
  }
  return openlogin;
}

export default getOpenLogin;
