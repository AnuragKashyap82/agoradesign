import axios from "axios";

const requestUrl = () => {
  return (
    <div>requestUrl</div>
  )
}

export const getAgoraToken=(channelName: string)=>{
  console.log(channelName);
  return axios.post("/users/create_agora_token",{channel_name:channelName,appId:"2b0bdd0de9f14d84bcff8fb037e452c3", appCertificate:"52bbf33775b64e9598f97df5cbc92f58"})
}

export default requestUrl