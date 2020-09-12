// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { DirectThreadEntity, IgApiClient } from 'instagram-private-api';
import { NextApiRequest, NextApiResponse } from 'next'

const ig = new IgApiClient();

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

  async function login(username: string, password: string) {
    // basic login-procedure
    ig.state.generateDevice(username);
    await ig.account.login(username, password);
  }

  async function sendText(thread: DirectThreadEntity, text: string) {
    console.log(await thread.broadcastText(text));
  }

  console.log(req.method)

  if(req.method==='POST'){
    const username: string = req.body.username;
    const password: string = req.body.password;
    const text: string = req.body.text;
    const time: number = req.body.time;

    await login(username,password);
    const [thread] = await ig.feed.directInbox().records();

    for(let i = 0;i<time;i++){
      sendText(thread,text);
      await sleep(100);
    }
    
  }
  res.send('OK')
}
