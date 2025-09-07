import './App.css';

const App = () => {
  return (
  <section className="sm:max-xl:bg-blue-50 sm:max-xl:p-9 grid gap-8 tablet:grid-cols-2 tablet:items-center tablet:text-left">
    <div>
      <img src="https://img.freepik.com/free-photo/beautiful-tropical-beach-with-coconut-palm-tree-paradise-island_74190-2206.jpg" alt="Beautiful tropical beach" 
      className="w-full rounded-lg"/>
    </div>
    <div>
      <h1 className="text-4xl font-medium mb-2">Headline</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
      </p>
    </div>
  </section>)
};

export default App;