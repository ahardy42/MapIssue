## project steup:

setup requires a mapbox account with public and private keys (to use later than iOS v6 sdk)

### setup keys
#### iOS:
1. add the following to your ```.netrc``` file (located in your user folder at ```~/.netrc```) which you might have to create
    ```
    machine api.mapbox.com
        login mapbox
        password <your private key>
    ```
2. create a ```.env``` file in the root of this project and add ```MAPBOX_KEY=<your publick key>```
3. in the ```Info.plist``` file in ```/ios/MapIssue``` create the following string/key combo:
```
<key>MBXAccessToken</key>
<string>$(MAPBOX_KEY)</string>
```

#### android:
1. Find or create a gradle.properties file in your Gradle user home folder. The folder can be found at «USER_HOME»/.gradle. Once you have found or created the file, its path should be «USER_HOME»/.gradle/gradle.properties. You can read more about Gradle properties in the official Gradle documentation.
2. Add your secret token your gradle.properties file: ```MAPBOX_DOWNLOADS_TOKEN=YOUR_SECRET_MAPBOX_ACCESS_TOKEN```

## setup project
1. clone repo ```git clone https://github.com/ahardy42/MapIssue.git```
2. install dependencies ```cd MapIssue && yarn```
3. install pods ```cd ios && pod install && cd ..```

and away you go!

to replicate the problem:

navigate to ```components/ShapeLayer.js``` and uncomment line 25