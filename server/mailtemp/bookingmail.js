

const BookingTemp = (id,checkin,checkout) =>{
    return `
    <!DOCTYPE html>
<html lang="en">
  
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation Email</title>
  <link href=' https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Playwrite+ES:wght@100..400&display=swap' rel='stylesheet' type='text/css'>
  
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7fafc;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }

    .container {
      background-color: #fff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 24px;
      width: 100%;
      max-width: 480px;
    }

    .text-center {
      text-align: center;
    }

    .text-blue-700 {
      color: #2b6cb0;
    }

    /* .text-blue-700 {
      color: #2b6cb0;
    } */

    .text-green-500 {
      color: #48bb78;
    }

    .font-bold {
      font-weight: bold;
    }

    .font-extrabold {
      font-weight: 800;
    }

    .mt-8 {
      margin-top: 32px;
    }

    .mt-4 {
      margin-top: 16px;
    }

    .mb-4 {
      margin-bottom: 16px;
    }

    .mb-6 {
      margin-bottom: 24px;
    }

    .border-t {
      border-top: 1px solid #e2e8f0;
    }

    .border-gray-300 {
      border-color: #e2e8f0;
    }

    .py-2 {
      padding-top: 8px;
      padding-bottom: 8px;
    }

    .w-full {
      width: 100%;
    }

    .max-w-lg {
      max-width: 640px;
    }

    .text-xl {
      font-size: 1.25rem;
    }

    .text-3xl {
      font-size: 1.875rem;
    }

    .text-5xl {
      font-size: 3rem;
    }

    .p-6 {
      padding: 24px;
    }

    .rounded-lg {
      border-radius: 8px;
    }

    .shadow-md {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .flex {
      display: flex;
    }

    .justify-between {
      justify-content: space-between;
    }

    .flex-col {
      flex-direction: column;
    }

    .items-center {
      align-items: center;
    }

    .bg-gray-100 {
      background-color: #f7fafc;
    }

    .bg-white {
      background-color: #fff;
    }

    .overflow-hidden {
      overflow: hidden;
    }

    .font {
      font-family: "Dancing Script", cursive;
        font-optical-sizing: auto;
        font-weight: weight;
        font-style: italic;
        color: #0000EE;
        src: url(https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Playwrite+ES:wght@100..400&display=swap) format("truetype");
    }


    .w-fit {
      width: fit-content;
    }

    .px-2 {
      padding-left: 8px;
      padding-right: 8px;
    }

    .ml{
      margin-left: 140px;
    }

    a {
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="text-center mb-4">
      <p class="text-5xl w-fit px-2 ml-[140px] font-bold ml font">
        Hotel Hub
      </p>
      <h1 class="text-3xl font-bold mt-8">Booking Confirmed</h1>
      <p class="text-gray-600 mt-4">We are pleased to inform you that your reservation request has been received and confirmed.</p>
    </div>
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-center mb-4">Booking Details</h2>
      <div class="border-t border-gray-300">
        <div class="flex justify-between py-2">
          <span>Booking Id:</span>
          <span>${id}</span>
        </div>
        <div class="flex justify-between py-2">
          <span>Check-in:</span>
          <span>${checkin}</span>
        </div>
        <div class="flex justify-between py-2">
          <span>Check-out:</span>
          <span>${checkout}</span>
        </div>
        <div class="flex justify-between py-2">
          <span>Total:</span>
          <span>25K</span>
        </div>
        <div class="flex justify-between py-2">
          <span>Status:</span>
          <span class="text-green-500">Confirmed</span>
        </div>
      </div>
    </div>
    <div class="text-center mb-4">
      <p>For more details visit our website</p>
      <a href="/"><span class="font-extrabold text-3xl font">Hotel Hub</span></a>
    </div>
    <div class="text-center">
      <p>If you have any questions, feel free to contact us at <a href="mailto:hotelhub@gmail.com" class="text-blue-500">hotelhub@gmail.com</a>.</p>
    </div>
  </div>
</body>
</html>

`
}

module.exports = BookingTemp;