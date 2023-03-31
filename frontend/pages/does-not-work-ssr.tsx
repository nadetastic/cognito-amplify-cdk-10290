import { withSSRContext } from "aws-amplify";
import * as React from "react";

export default function Home(props) {
  const [message, _setMessage] = React.useState(props.message);

  return <div>{message}</div>;
}

export const getServerSideProps = async ({req}) => {
  const SSR = withSSRContext({req});
  
  // Set the headers for the API call here instead
  const myInit = {
    headers: {
      Authorization: `Bearer ${(await SSR.Auth.currentSession()).getIdToken().getJwtToken()}`
    }
  };

  // This should now work when passing the headers in `myInit` above
  const payload = await SSR.API.get("API", "/hello", myInit);

  console.log(payload);

  return {
    props: { message: JSON.stringify(payload) },
  };
};
