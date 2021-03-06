import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
  useViewerQuery,
  useUpdateNameMutation,
  ViewerDocument,
} from '../lib/viewer.graphql'
import { initializeApollo } from '../lib/apollo'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Menu } from '../components/menu'
import { H1 } from '../components/H1'
import { Temp } from '../components/Temp'
import {ESP8266_DHT_Data} from '../types'

const Index = () => {
  const { data, loading, error } = useViewerQuery()
  const [newName, setNewName] = useState('')
  const [updateNameMutation] = useUpdateNameMutation()
  const [temp, setTemp] = useState<Number>(0);

  const onChangeName = () => {
    updateNameMutation({
      variables: {
        name: newName,
      },
    })
  }

  useEffect(() => {
    const loadData = async () =>{
      const result = await fetch("http://192.168.1.27/");
      const data = (await result.json()) as ESP8266_DHT_Data;
      console.log(data.temp);
      setTemp(data.temp);
    };
    loadData();
  },[]);

  return (
    <div className={styles.container}>
      <Head>
        <title>SmartHome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <main className={styles.main}>
        <H1>Welcome to SmartHome</H1>

        <Temp>{temp}</Temp>

        <div className={styles.graphql}>
          {loading && <>Loading....</>}
          {error && <>Error</>}
          {data && (
            <>
              You're signed in as {data.viewer.name} and you're{' '}
              {data.viewer.status}. Go to the{' '}
              <Link href="/about">
                <a>about</a>
              </Link>{' '}
              page.
              <div>
                <input
                  type="text"
                  value={newName}
                  placeholder="your new name..."
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button type="button" onClick={onChangeName}>
                  Change
                </button>
              </div>
            </>
          )}
        </div>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerDocument,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
