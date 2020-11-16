package functions

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	iocContainerRoot "github.com/Jblew/ioccontainer"
	"github.com/Jblew/ioccontainer/pkg/ioccontainer"
	"github.com/siejmy/siejmyquiz/functions/app"
)

var container *ioccontainer.Container = iocContainerRoot.NewContainer()

func init() {
	appConfig := GetAutogeneratedConfig()
	container.Singleton(func() app.Config {
		return appConfig
	})

	firebaseApp, err := firebase.NewApp(context.Background(), &firebase.Config{})
	if err != nil {
		log.Fatalf("firebase.NewApp: %v", err)
		return
	}

	container.Singleton(func() *firebase.App {
		return firebaseApp
	})

	firestoreClient, err := firebaseApp.Firestore(context.Background())
	if err != nil {
		log.Fatalf("app.Firestore: %v", err)
		return
	}

	container.Singleton(func() *firestore.Client {
		return firestoreClient
	})

	app.Bind(container)
	log.Printf("%+v", container)
}
