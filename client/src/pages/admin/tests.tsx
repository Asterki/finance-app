const TestPage = () => {
  return (
    <div>
      <p>
        This page will be used to conduct random tests using the current's app state, this should not be accessible in
        production.
      </p>

      <main>
        <button className='btn'>
          Test
        </button>
      </main>
    </div>
  );
};

export default TestPage;
