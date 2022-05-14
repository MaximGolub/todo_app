export const generateUserTemplate = ({ name, age }) => {
  return `
    <div class="container mx-auto mt-5">
        <div class="text-center">
            <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                class="rounded-full w-32 mb-4 mx-auto"
                alt="Avatar"
            />
            <h5 class="text-xl font-medium leading-tight mb-2">${name}</h5>
            <p class="text-gray-500">Age ${age}</p>
            <button type="button" class="inline-block mt-2 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" id="logout">Logout</button>
        </div>
    </div>`;
};
