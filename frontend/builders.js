// Load builders from Supabase
async function loadBuilders() {

    try {

        const { data, error } = await supabase
            .from("builders")
            .select("*")
            .eq("verified", true);

        if (error) {
            console.error("Supabase Error:", error);
            return;
        }

        console.log("Builders loaded:", data);

        displayBuilders(data);

    } catch (err) {
        console.error("Unexpected error:", err);
    }
}


// Display builders on the page
function displayBuilders(builders) {

    const container = document.getElementById("builders-list");

    if (!container) {
        console.error("builders-list container not found in HTML");
        return;
    }

    container.innerHTML = "";

    if (builders.length === 0) {
        container.innerHTML = "<p>No verified builders available.</p>";
        return;
    }

    builders.forEach(builder => {

        const card = `
            <div class="builder-card">
                <h3>${builder.name}</h3>
                <p><strong>Location:</strong> ${builder.location}</p>
                <p><strong>Price:</strong> ₹${builder.price_per_sqft}/sqft</p>
                <p><strong>Rating:</strong> ⭐ ${builder.rating}</p>
                <p><strong>Experience:</strong> ${builder.experience} years</p>
            </div>
        `;

        container.innerHTML += card;

    });

}


// Wait for page to load before running
document.addEventListener("DOMContentLoaded", function () {
    loadBuilders();
});