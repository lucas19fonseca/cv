export default function Wave() {
    return (
        <div>
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)"
                class="animate-move-forever" style="animation-delay:-2s; animation-duration:7s;" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"
                class="animate-move-forever" style="animation-delay:-3s; animation-duration:10s;" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"
                class="animate-move-forever" style="animation-delay:-4s; animation-duration:13s;" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="#E2E2E2E2"
                class="animate-move-forever" style="animation-delay:-5s; animation-duration:20s;" />

        </div>
    );
}