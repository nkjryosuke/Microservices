import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("api/users/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
    // appContext.Componentでapp.js以下の各ページ、つまり全てのページが対象となる。
    // appContext.Component.getInitialPropsで各ページのgetInitialPropsを発動させることができる。
    // ただしgetInitialPropsを設定していないページもあるので、存在の判定を入れてる。
  }

  console.log(pageProps);
  return { pageProps, ...data };
};
export default AppComponent;
