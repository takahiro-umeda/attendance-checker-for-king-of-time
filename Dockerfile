FROM node:lts

# Install dependent packages
RUN set -x \
&&  apt-get update -y \
&&  apt-get install -y \
    locales \
    wget \
    fonts-noto-cjk \
&&  apt-get autoremove \
&&  apt-get autoclean \
&&  apt-get clean \
&&  rm -rf /var/log/* /var/lib/apt/lists/* \
&&  locale-gen ja_JP.UTF-8 \
&&  localedef -f UTF-8 -i ja_JP ja_JP \
&&  corepack enable yarn

ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:jp
ENV LC_ALL ja_JP.UTF-8
ENV TZ "Asia/Tokyo"

# Install Google Chrome
RUN set -x \
&&  wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -\
&&  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
&&  apt-get update -y \
&&  apt-get install -y \
    google-chrome-stable \
&&  apt-get autoremove \
&&  apt-get autoclean \
&&  apt-get clean

# Install ChromeDriver
WORKDIR /chromedriver

RUN set -x \
&& CHROME_VERSION_PATH=LATEST_RELEASE_$(google-chrome --version | cut -d " " -f 3 | cut -d "." -f 1-3) \
&& CHROME_DRIVER_VERSION_PATH=$(wget -qO- "https://chromedriver.storage.googleapis.com/${CHROME_VERSION_PATH}") \
&& CHROME_DRIVER_LOCATION_PATH="https://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION_PATH/chromedriver_linux64.zip" \
&& wget -O chromedriver_linux64.zip $CHROME_DRIVER_LOCATION_PATH \
&& unzip chromedriver_linux64.zip

ENV PATH /chromedriver:$PATH

WORKDIR /app

COPY . .

RUN set -x \
&& yarn install \
&& yarn build \
&& chmod +x ./entrypoint.sh

ENTRYPOINT [ "/bin/bash", "-c" ]
CMD ["./entrypoint.sh"]
