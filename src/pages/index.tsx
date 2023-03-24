import Head from 'next/head'

import DummyComponent from '@/components/DummyComponent/dummyComponent'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <div>
          <DummyComponent />
        </div>
      </main>
    </>
  )
}
