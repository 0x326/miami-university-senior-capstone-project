# Installation And Running

## System Requirements

* A computer running windows 10

* Preferably 4GB of RAM or greater

* Preferably MS Excel

    * While not necessary to use the software, will be useful for looking over results of
      experiments in progress and making modifications to experiment data on the fly.
      
## Installation

Per our agreement with Dr. Quinn, all local software necessary to run the scale component is
pre-installed on the lab tablet. The web component is served remotely, so no installation is
necessary. Just access it with a browser.

## Starting Application
1. Turn on scale
2. Plug scale into tablet
3. Launch StartScaleApp.sh
4. Open the [web interface](https://0x326.gitlab.io/miami-university-senior-capstone-project/app/)
   and begin recording!

## Use

We hope the system is simple and intuitive enough to use without too much instruction. However, we
will include some basic usage instructions that might be useful to reference if you get stuck
anywhere.


1. In the homepage of our application, you have two basic choices to make. Do you want to make a
   new experiment (i.e. define a new experiment procedure including the number of sessions to run,
   the number of bottles per cage, etc.) or do you want to start from experiment data you've already
   collected. Regardless of choice, you'll be taken to a `Session Precheck` following your
   selection.

2. The `Session Precheck` screen will show you basic metadata about the experiment, including the
   primary experimenter, the date the experiment was created, when it was last updated, etc. You
   then have a few options: `ADD CAGES`, `CONNECT SCALE`, or `BEGIN`.

    * If you want to add new cages to your experiment *and* you're ready to record new data for
      them, you should click `ADD CAGES`. This will take you to a simple interface for adding
      cages. Additionally, **if you created a new experiment**, you will *need* to add cages. Once
      you are done adding cages, you'll be taken back to the same screen.

    * You can press `CONNECT TO SCALE` to attempt to connect to the local process running on the lab
      tablet that handles the scale data. If the connection was successful, you'll see a message
      saying so. You do not *need* to connect to a scale to run our application. If you're having
      technical difficulties for whatever reason, you always have the fail-safe option of manually
      entering data.

    * When you're done optionally adding cages and have decided whether or not you want to connect
      to the scale, click `BEGIN`. This will take you into a recording session. The recording itself
      is self-explanatory.

3. After you're done recording your new data, the file containing the new weights will automatically
   be downloaded to your browser's default download location (probably the standard `Downloads`
   folder). If upon inspecting the data you notice something wrong with it, you have the option of
   restarting the session by clicking `RESTART SESSION`. You can also start a new session by
   clicking `START NEW SESSION` which will take you back to the homepage.
