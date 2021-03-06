import React, { useState, useEffect } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

enum PlataformEnum {
  ANDROID = "ANDROID",
  IOS = "IOS",
}

type IPlataform = keyof typeof PlataformEnum;

type IStoreLink = {
  [key in IPlataform]: string;
};

interface IPlataformProps {
  plataform: string;
  store: string;
}

const storeLink: IStoreLink = {
  [PlataformEnum.ANDROID]: "https://play.google.com/store",
  [PlataformEnum.IOS]: "https://www.apple.com/br/app-store/",
};

const DynamicComponentWithNoSSR = dynamic({ ssr: false });

const Home: NextPage = () => {
  const [plataform, setPlataform] = useState<IPlataformProps>(
    (): IPlataformProps => {
      const plataform =
        typeof window !== "undefined"
          ? navigator.platform.toUpperCase()
          : `Não Indentiquei`;

      if (
        /MAC/i.test(`${plataform}`) ||
        /IPHONE/i.test(`${plataform}`) ||
        /IPOD/i.test(`${plataform}`) ||
        /IPAD/i.test(`${plataform}`)
      ) {
        return {
          plataform,
          store: storeLink[PlataformEnum.IOS],
        };
      }

      return {
        plataform,
        store: storeLink[PlataformEnum.ANDROID],
      };
    }
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Teste Plataforma</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Teste Plataforma</h1>

        <p className={styles.description}>
          Vocês está usando em um: <span>{`${plataform.plataform}`}</span>
        </p>
        <p className={styles.description}>
          <a href={`${plataform.store}`} target="blank">
            Ir para a loja!
          </a>
        </p>
      </main>

      <footer className={styles.footer}>Powered by Xavier Jecé</footer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
