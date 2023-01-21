
// Base url For staging  
const XANO_BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:1zR1S5hR";

// const URL_CREATE_SDK_TOKEN = "/v1/sdk-tokens";
const URL_GET_ME = "/auth/me";

const url = new URL(window.location.toLocaleString());
const parameters = new URLSearchParams(url.search);
const auth = parameters.get('auth');
const handle = parameters.get('handle');
const external_id = parameters.get('external_id');
const pid = parameters.get('pid');

localStorage.setItem(external_id, pid, auth, handle); 
sessionStorage.setItem(localStorage.getItem("auth"));
console.log(localStorage.getItems("external_id","pid","auth","handle"));

// encode client_id:secret to base-64
const AUTH_KEY = auth;

const getAxiosInstance = () => {
  const api = axios.create({
    baseURL: XANO_BASE_URL,
    headers: {
      'Authorization':'Bearer ' + AUTH_KEY
    },
  });
  return api;
  console.log(api);
};
const createUser = async (name, externalId, isExistingUser) => {
  try {
    const userId = await localStorage.getItem("id");
    if (isExistingUser) {
      return userId;
    } else if (!isExistingUser || !Boolean(userId)) {
      const api = getAxiosInstance();
      let response = await api.post(URL_GET_ME, {
        name: name,
        external_id: externalId,
      });
      await localStorage.setItem("id", response.data.id);
      return response.data.id;
    }
  } catch (err) {
    console.error(`Error ${err} occurred while retrieving the user`);
    return err.body;
  }
};

const createSDKToken = async (userId) => {
  if (!userId) {
    let err = new Error("User id cannot be blank or null");
    throw err;
  }
  try {
    const api = getAxiosInstance();
    let response = await api.post(URL_GET_ME, {
      user_id: userId,
      products: ["IDENTITY", "ENGAGEMENT", "IDENTITY.AUDIENCE", "ENGAGEMENT.AUDIENCE"],
    });
    return response.data.sdk_token;
  } catch (err) {
    console.error(`Error ${err} occurred while generating user token`);
    return err.body;
  }
};
