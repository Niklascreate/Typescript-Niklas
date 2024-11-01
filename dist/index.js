var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let buttonRef = document.querySelector('#randomizeButton');
buttonRef === null || buttonRef === void 0 ? void 0 : buttonRef.addEventListener('click', () => {
    fetchRandomJoke();
});
function fetchRandomJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'https://api.humorapi.com/jokes/random';
        const apiKey = 'c622bc16f7a44bea9ec5b1b5f82431ac';
        try {
            const response = yield fetch(`${apiUrl}?key=${apiKey}`);
            if (!response.ok) {
                throw new Error('Someting went wrong, could not fetch the joke.');
            }
            const data = yield response.json();
            const contentRef = document.querySelector('#giggleContent');
            if (contentRef) {
                contentRef.innerText = data.joke;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Wrong:', error.message);
            }
            else {
                console.error('Unknown error discovered');
            }
        }
    });
}
