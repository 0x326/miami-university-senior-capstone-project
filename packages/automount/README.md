# Auto-mount script for Linux

- udev rules go in  `/etc/udev/rules.d/99-scale-interface.rules`

- systemd service goes in `/etc/systemd/system/scale_interface_automount@.service`

- run `systemctl enable scale_interface_automount@.service`

- check its status with `systemctl status scale_interface_automount@.service`
