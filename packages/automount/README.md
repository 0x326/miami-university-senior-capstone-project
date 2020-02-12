# Auto-mount script for Linux

- udev rules go in  `/etc/udev/rules.d/99-scale-interface.rules`

- systemd service goes in `/etc/systemd/system/scale_interface_automount@.service`

- run `systemctl enable scale_interface_automount@.service`

- check its status with `systemctl status scale_interface_automount@.service`

---

Udev rules and systemd service written in /automount project directory to detect
a valid scale interface USB device at /dev and mount this device to
/media/scale_interface_mountpoint. This mountpoint will be created and destroyed
automatically, so if it exists, the program can assume a valid USB device is
attached. The locations of where these two files should be saved to in the
Raspberry Pi's filesystem is documented as a comment at the top of each file.
