# Typescript-Niklas
## Individuell uppgift i Typescript.

# Dokumentation av tsconfig.json.

### "target": "ES6", 
=```` Kompilatorn kommer att kompilera koden till Javascript ES6. ````

<br>

### "module": "ES6",
=````Kompilatorn kommer att skapa Javascript-moduler enligt ES6-standarden, vilket betyder att den använder import och export för att hantera moduler.````

<br>

### "baseUrl": "./src",
=````Kompilatorn kommer att använda mappen ./src som utgångspunkt när den letar efter moduler i projektet.````

<br>

### "outDir": "./dist",
=````I denna mapp kommer alla kompilerade filer att hamna.````

<br>

### "noEmitOnError": true,
=````Typescript kommer inte att generera några Javascript-filer om det finns typfel i koden. Kompileringen stoppas om det finns några fel, och inga filer skapas.````

<br>

### "esModuleInterop": true,
=````Gör det enklare att importera vanliga (CommonJS) moduler i Typescript, så att du kan använda ES6-importer även med äldre moduler.````

<br>

### "forceConsistentCasingInFileNames": true,
=````Denna säkerställer att rätt filnamn används vid importer. Eftersom Typescript är känsligt för stora och små bokstäver (case sensitive).````

<br>

### "strict": true,
=````Aktiverar alla strikta typkontroller i Typescript, vilket gör koden säkrare och hjälper till att upptäcka fel tidigare.````

<br>

### "strictNullChecks": true,
=````Förhindrar att null och undefined används där de inte är tillåtna.````

<br>

### "alwaysStrict": true,
=````Ser till att "use strict" alltid används i den genererade Javascript-koden, vilket gör koden säkrare och fångar upp fler fel.````

<br>

### "skipLibCheck": true,
=````Ser till att Typescript hoppar över typkontrollen av externa bibliotek. Vilket kan snabba upp kompileringen.````

<br>

### "noUnusedLocals": true,
=````Ser till att felrapportera variabler som inte används i koden för att säkerställa att allt används.````
