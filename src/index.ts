let buttonRef: HTMLButtonElement = document.querySelector('#randomizeButton') as HTMLButtonElement;

buttonRef?.addEventListener('click', () => {
    fetchRandomJoke();
});

async function fetchRandomJoke(): Promise<void> {
    const apiUrl: string = 'https://api.humorapi.com/jokes/random';
    const apiKey: string = 'c622bc16f7a44bea9ec5b1b5f82431ac';

    try {
        const response: Response = await fetch(`${apiUrl}?key=${apiKey}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Response:', response);
        if (!response.ok) {
            throw new Error('Something went wrong, could not fetch the joke.');
        }
        const data: { joke: string } = await response.json();
        const contentRef: HTMLElement | null = document.querySelector('#giggleContent') as HTMLElement;
        if (contentRef) {
            contentRef.innerText = data.joke;
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Wrong:', error.message);
        } else {
            console.error('Unknown error discovered');
        }
    }
}
