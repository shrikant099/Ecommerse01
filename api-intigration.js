document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");

    menuBtn.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });
});

document.addEventListener("DOMContentLoaded", async () => {
    const cardSection = document.querySelector("#cardSection"); 

    try {
        const fetchAllProducts = await fetch("https://dummyjson.com/products", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json"
            }
        });

        if (!fetchAllProducts.ok) {
            console.log("Error Fetching products. Please try again");
            return;
        }

        const parseData = await fetchAllProducts.json();

        if (!parseData.products || parseData.products.length === 0) {
            console.log("Products not found!");
            return;
        }

        // Clear existing content (optional)
        cardSection.innerHTML = "";

        parseData.products.forEach((product) => {
            cardSection.innerHTML += `
              <div class="bg-gray-800 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                    <input type="hidden" data-id="${product.id}">
                     <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-48 object-cover rounded-md">
                    <h2 class="text-xl font-bold mt-4 text-yellow-400">${product.title}</h2>
                    <p class="text-gray-300 mt-2">${product.description}</p>
                    <p class="text-gray-300 mt-2">${product.category}</p>
                    <p class="text-yellow-400 font-semibold mt-2">$${product.price}</p>
                    <button data-id="${product.id}" class="addCartBtn mt-4 cursor-pointer bg-yellow-400 text-gray-900 px-4 py-2 rounded-md font-bold transition-all duration-300 hover:bg-yellow-500">
                        Add to Cart
                    </button> 
            </div>
            `;
        });

    } catch (error) {
        console.log(`Error Fetching Data: Internal Server Error - ${error}`);
    };

    const addCartButton = document.querySelectorAll('.addCartBtn');
    addCartButton.forEach((item) => {
        item.addEventListener('click' , (e) => {
            alert("Add cart request Sent succesfully..")
        })

    })
});
