# Native mobile build with `ionic`

```shell
# if you would like to add ionic globally
npm install -g ionic 
npm install -g cordova
ng add @ionic/angular
# force is not mandatory
ionic init --force
```
Meg kell adni _pontosan_ a project nevét (esetünkben "wage-sum-angular-ui").

```shell
ionic cordova run android --project="wage-sum-angular-ui"
[ERROR] native-run was not found on your PATH. Please install it globally:
    npm i -g native-run
```
Ez még nem elég....

```shell
ionic cordova run android --project="wage-sum-angular-ui"
[ERROR] The Cordova CLI was not found on your PATH. Please install Cordova globally:
    npm i -g cordova
```

```
> ng.cmd run wage-sum-angular-ui:ionic-cordova-build --platform=android
An unhandled exception occurred: Package "@ionic/angular-toolkit" has no builders defined.
See "C:\Users\XXXXXX\AppData\Local\Temp\ng-Sx5TEj\angular-errors.log" for further details.
[ERROR] An error occurred while running subprocess ng.
```
https://stackoverflow.com/questions/71270504/error-package-ionic-angular-toolkit-has-no-builders-defined

```shell
npm install -g @ionic/cordova-builders

npm install @ionic/angular-toolkit@latest
```

De ez még mindig nem elegendő. Ez sem segitett: 
```shell
npm i @angular-devkit/architect@latest 
npm i @angular-devkit/build-angular@latest
npm i @angular-devkit/core@latest 
npm i @angular-devkit/schematics@latest
```
```json
 "ionic-cordova-serve": {
          "builder": "@ionic/cordova-builders:cordova-serve",
          "options": {
            "cordovaBuildTarget": "wage-sum-angular-ui:ionic-cordova-build",
            "devServerTarget": "wage-sum-angular-ui:serve"
          },
          "configurations": {
            "production": {
              "cordovaBuildTarget": "wage-sum-angular-ui:ionic-cordova-build:production",
              "devServerTarget": "wage-sum-angular-ui:serve:production"
            }
          }
        },
        "ionic-cordova-build": {
          "builder": "@ionic/cordova-builders:cordova-serve",
          "options": {
            "cordovaBuildTarget": "wage-sum-angular-ui:ionic-cordova-build",
            "devServerTarget": "wage-sum-angular-ui:serve"
          },
          "configurations": {
            "production": {
              "cordovaBuildTarget": "wage-sum-angular-ui:ionic-cordova-build:production",
              "devServerTarget": "wage-sum-angular-ui:serve:production"
            }
          }
        }
      }
```