export const TODOS_FORM_TEMPLATE = `<div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
<form>
  <div class="form-group mb-6">
    <label class="form-label inline-block mb-2 text-gray-700">Name</label>
    <input type="text" class="form-control block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Name" name="title" required>
  </div>
  <div class="form-group mb-6">
    <label class="form-label inline-block mb-2 text-gray-700">Description</label>
    <input type="text" class="form-control block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Description" name="description" required>
  </div>
  <div class="form-group mb-6">
      <select class="form-select appearance-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" id="task-selector" name="status">
          <option selected>in_progress</option>
          <option>completed</option>
          <option>canceled</option>
      </select>
  </div>
  <button type="submit" class="
    w-full
    px-6
    py-2.5
    bg-blue-600
    text-white
    font-medium
    text-xs
    leading-tight
    uppercase
    rounded
    shadow-md
    hover:bg-blue-700 hover:shadow-lg
    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
    active:bg-blue-800 active:shadow-lg
    transition
    duration-150
    ease-in-out" id="btn_add_task">Add</button>
</form>
</div>`;

export const TODOS_TABLE_TEMPLATE = `<div class="flex flex-col">
<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
  <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
    <div class="overflow-hidden">
      <table class="min-w-full">
        <thead class="border-b">
          <tr>
            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Title
            </th>
            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Description
            </th>
            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Status
            </th>
            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              CreatedAt
            </th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>`;
