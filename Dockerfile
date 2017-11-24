FROM alpine

ADD prune.sh /opt/prune.sh

WORKDIR /app

ENTRYPOINT ["/opt/prune.sh"]

CMD ""