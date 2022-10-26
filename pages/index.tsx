import MainTemplate from '../src/templates/MainTemplate'

export async function getServerSideProps() {
  const shiftRes = await fetch(`${process.env.BASE_URL}shifts`);
  const shiftList = await shiftRes.json();

  const nursesRes = await fetch(`${process.env.BASE_URL}nurses`);
  const nurseList = await nursesRes.json();
  
  return {
    props: {
      nurseList,
      shiftList,
    }
  }
}

export default function Home() {

  return (
      <MainTemplate />
  )
}

